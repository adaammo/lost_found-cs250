# Lost&Found @ SDSU

Lost&Found @ SDSU is a website where SDSU students, faculty, and visitors report lost items on a campus map. Logged-in users create a report by filling out a short form and clicking the map to mark where the item was last seen. Anyone can browse reports on the map and in a list.

- **Front end:** Next.js (TypeScript, React, Tailwind CSS) in `/src`
- **Back end:** FastAPI (Python) in `/api`
- **Database and log-in:** Supabase (hosted PostgreSQL and Supabase Auth). The database is already hosted, so you do not need to set one up.

You run two programs at the same time: the back end on port 8000 and the front end on port 3000.

## 1. Install these first

| Tool | Version | How to check |
|---|---|---|
| Git | any recent version | `git --version` |
| Node.js (includes npm) | 20 or newer | `node --version` |
| Python | 3.14 or newer | `python --version` |
| uv (Python package manager) | any recent version | `uv --version` |

Install uv by following https://docs.astral.sh/uv/getting-started/installation/ (or run `pip install uv`).

## 2. Get the secret values

The app needs the Supabase URL and anon key. They are not in the repo. Ask Adam Mohamed (GitHub: `adaammo`) for them. Adam can also invite you to the Supabase dashboard.

## 3. Clone the repository

```bash
git clone https://github.com/adaammo/lost_found-cs250.git
cd lost_found-cs250
```

You should see the folders `api`, `src`, `public`, and `docs`.

## 4. Set up and start the back end (terminal 1)

```bash
cd api
uv sync
```

`uv sync` installs the Python packages. It ends without errors.

Create a file named `dev.env` inside the `api` folder with these lines (use the real values from step 2):

```
APP_ENV=development
SUPABASE_URL=<your Supabase URL>
SUPABASE_ANON_KEY=<your Supabase anon key>
```

Start the back end from inside the `api` folder:

```bash
uv run fastapi dev main.py
```

**What you should see:** a line like `Uvicorn running on http://127.0.0.1:8000`. Open http://localhost:8000/health in a browser and you should see `{"ok":"True"}`. The API docs are at http://localhost:8000/docs. Leave this terminal running.

## 5. Set up and start the front end (terminal 2)

Open a second terminal in the project's root folder (`lost_found-cs250`, not `api`).

```bash
npm install
```

`npm install` downloads the front-end packages into `node_modules`. It can take a few minutes.

Create a file named `.env.local` in the root folder with these lines:

```
NEXT_PUBLIC_SUPABASE_URL=<your Supabase URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your Supabase anon key>
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Start the front end:

```bash
npm run dev
```

**What you should see:** a line like `Local: http://localhost:3000`. Open http://localhost:3000 in a browser. You should see the SDSU campus map with item pins and a Recent Items list.

## 6. Check that everything works

1. Sign up with an email and password, then log in.
2. Open the Create Item Report form at the bottom left of the map.
3. Enter a name and a description, then click the map to choose a location.
4. Submit. A new pin appears on the map, and the item appears in the Recent Items list.

## 7. Run the tests

```bash
cd api
uv run pytest -v
```

**What you should see:** each test marked `PASSED`, ending with `7 passed`. The tests use a fake database, so they do not need `dev.env`. GitHub Actions runs the same tests on every push and pull request to `main`.

## Common problems

- **The home page shows an error instead of the map:** check that `.env.local` is in the root folder, that `NEXT_PUBLIC_API_URL` is `http://localhost:8000/api`, and that the back end (step 4) is running. Restart `npm run dev` after editing `.env.local`.
- **The back end fails to start with a Supabase error:** check that `dev.env` is inside the `api` folder and that you started the back end from inside `api`.
- **`Module not found` errors in the front end:** run `npm install` again in the root folder.
- **Python import errors:** run `uv sync` again inside `api`.

## More information

The midterm handoff document explains the features, architecture, known bugs, and next steps.

## Developers

- Julio Miyazaqui
- Joshua Groh
- Hyejoo Lee
- Adam Mohamed
