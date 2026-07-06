# campuses & students — client

frontend for our campuses & students crud app (csci 39548 final project).

you can browse campuses and students, see who's enrolled where, add/edit/delete
records, and move students between campuses (or un-enroll them).

## stack

- react 19 + typescript, vite
- react router for the pages
- tanstack query for fetching + caching
- zustand for the bit of ui state (sidebar + dark mode)
- tailwind for styling

## running it

you need the api running too (see campuses-server). then:

```bash
npm install
npm run dev
```

dev server is on http://localhost:5173. if your api isn't on
http://localhost:3000, set VITE_API_URL in a .env file.

## deployed

frontend link goes here once it's on vercel.
