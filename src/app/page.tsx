"use client";

import { Advocate } from "@/types/types";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

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

  const onClick = () => {
    setQuery('');
    triggerFetchData('');
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{query}</span>
        </p>
        <input
          style={{ border: "1px solid black" }}
          onChange={onChange}
          value={query}
        />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate, advocateIndex) => {
            return (
              <tr key={advocateIndex}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, specialtyIndex) => (
                    <div key={specialtyIndex}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
