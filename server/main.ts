import { Hono } from 'jsr:@hono/hono'
import { getAllGameData } from "./utils/app.util.ts";
import { dataStore } from "./utils/util.ts";
import { serveStatic } from 'jsr:@hono/hono/deno'
import { cors } from 'jsr:@hono/hono/cors'

const cacheKey = 'main-cache';
const store = dataStore<AwaitReturn<typeof getAllGameData>>(cacheKey);

const app = new Hono();

app.use('/api/*', cors())
app.get('/api/data', (c) => {
    const data = store.get();
    return c.json(data);
})

app.get('/api/is-set', (c) => {
    return c.json(store.isSet)
})

app.use('/*', serveStatic({ root: './app' }))
app.get('*', (c) => c.text('Not Found', 404));

Deno.serve(app.fetch);

async function cacheGameData(useCache = true) {
    const data = await getAllGameData(useCache);
    store.set(data);
}

setTimeout(cacheGameData)
// setInterval(() => cacheGameData(false), 1000 * 60 * 60 * 6)
