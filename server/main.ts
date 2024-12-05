import { Hono } from 'jsr:@hono/hono'
import { getAllGameData } from "./utils/app.util.ts";
import { dataStore } from "./utils/util.ts";
import { serveStatic } from 'jsr:@hono/hono/deno'
import { cors } from 'jsr:@hono/hono/cors'
const log = console.log;

const cacheKey = 'main-cache';
const app = new Hono();

app.use('/api/*', cors())
app.get('/api/data', async (c) => {
    const store = dataStore<AwaitReturn<typeof getAllGameData>>(cacheKey);
    const promise = getAllGameData();

    promise.then(data => store.set(data));

    const data = store.get();
    if (data) return c.json(data);

    return c.json(await promise);
})

app.use('/*', serveStatic({ root: './dist' }))
app.get('*', (c) => c.text('Not Found', 404));

Deno.serve(app.fetch);

// to cache the data at least once
setTimeout(() => getAllGameData)