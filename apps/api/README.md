# API foundation
Reserved for the independently deployed Express modular monolith; no runtime or endpoints yet.

Entry points when implemented: src/app.ts (setup) and src/server.ts (startup).
Each domain in src/modules uses routes.ts, controller.ts, service.ts, model.ts, schema.ts and policy.ts as needed. Controllers validate/authenticate; services authorize and enforce business rules; models persist; integrations adapt providers. Avoid direct cross-domain model writes.

Every wedding query must enforce authorized weddingId; private financial records also require owning organization checks. Guest tokens never grant manager permissions.
