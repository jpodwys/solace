"use client";

import { Advocate } from "@/types/types";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import AdvocateCard from "./components/AdvocateCard";
import SearchInput from "./components/SearchInput";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const abortMessage = 'replaced';
    const controller = new AbortController();
    const { signal } = controller;
    fetch(`/api/advocates?q=${debouncedQuery}`, { signal }).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    }).catch(error => {
      if (error !== abortMessage) {
        throw error;
      }
    });

    return () => {
      controller.abort(abortMessage);
    }
  }, [debouncedQuery, setAdvocates]);

  const triggerFetchData = useCallback(
    debounce((q: string) => {
      setDebouncedQuery(q);
    }, 200),
    [setDebouncedQuery],
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    triggerFetchData(e.target.value);
  }, [setQuery, triggerFetchData]);

  const reset = () => {
    setQuery('');
    triggerFetchData('');
  };

  return (
    <main className="p-6">
      <h1 className="text-4xl mb-6">Solace Advocates</h1>
      <div>
        <SearchInput query={query} reset={reset} onChange={onChange} />
      </div>
      <div className="flex flex-wrap justify-center mt-6">
        {advocates.map((advocate, index) => {
          return <AdvocateCard advocate={advocate} key={index} />;
        })}
      </div>
    </main>
  );
}
