import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { adminEnabled } from "@/lib/admin";

const notFound = () => new Response("Not Found", { status: 404 });
const handler = adminEnabled ? makeRouteHandler({ config }) : { GET: notFound, POST: notFound };

export const { GET, POST } = handler;
