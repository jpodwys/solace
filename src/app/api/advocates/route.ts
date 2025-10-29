import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { desc, ilike, or, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const data = await db
    .select()
    .from(advocates)
    .orderBy(desc(advocates.createdAt), desc(advocates.id))
    .where(
      !!query
        ? or(
            ilike(advocates.firstName, `%${query}%`),
            ilike(advocates.lastName, `%${query}%`),
            ilike(advocates.city, `%${query}%`),
            ilike(advocates.degree, `%${query}%`),
            ilike(sql`${advocates.specialties}::text`, `${`%${query}%`}`),
            ilike(sql`CAST(${advocates.yearsOfExperience} AS TEXT)`, `%${query}%`),
            ilike(advocates.phoneNumber, `%${query}%`),
          )
        : undefined
    ).limit(10);
  return Response.json({ data });
}
