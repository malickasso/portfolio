import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { adminEnabled, adminIsLocal, isLocalRequest } from "@/lib/admin";

const notFound = () => new Response("Not Found", { status: 404 });
const keystatic = adminEnabled ? makeRouteHandler({ config }) : null;

function guard(handler: ((request: Request) => Promise<Response>) | undefined) {
  return async (request: Request) => {
    if (!handler) return notFound();
    if (adminIsLocal && !isLocalRequest(request)) return notFound();
    return handler(request);
  };
}

export const GET = guard(keystatic?.GET);
export const POST = guard(keystatic?.POST);
