# Home Hancer — MERN + Vite CMS

A React + Vite + Tailwind frontend with an Express + MongoDB Atlas API and a protected admin CMS. The original public landing page design and light/dark toggle are retained. Services, gallery items and testimonials load from MongoDB; customer enquiries are saved to MongoDB and managed from the CMS.

## Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm
- A MongoDB Atlas cluster and database user

## 1. Install dependencies

From the project root:

```bash
npm install
npm --prefix server install
```

## 2. Configure MongoDB Atlas

1. Sign in to MongoDB Atlas and create a free/shared cluster.
2. In **Database Access**, create a database user and set a strong password.
3. In **Network Access**, add your current IP address for development. Avoid `0.0.0.0/0` unless you understand the exposure and need it for a temporary deployment.
4. Open **Connect → Drivers → Node.js**, copy the connection string.
5. Replace the username, password and cluster host. URL-encode special characters in the database password.
6. Add a database name, for example `home_hancer`.

Create `server/.env` by copying `server/.env.example` and set:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://YOUR_DB_USER:YOUR_URL_ENCODED_PASSWORD@YOUR_CLUSTER.mongodb.net/home_hancer?retryWrites=true&w=majority
JWT_SECRET=PASTE_A_RANDOM_SECRET_WITH_AT_LEAST_32_CHARACTERS
JWT_EXPIRES_IN=1d
ADMIN_NAME=Home Hancer Admin
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=Use-A-Unique-Password-At-Least-12-Chars
CLIENT_URL=http://localhost:5173
```

Generate a strong JWT secret, for example with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Never commit `.env` files or share your Atlas URI, database password, JWT secret or admin password.

## 3. Create the first admin and starter CMS content

With `server/.env` configured, run this once:

```bash
npm --prefix server run seed
```

The seed script creates/updates the admin account from `ADMIN_EMAIL` and `ADMIN_PASSWORD`. It also inserts starter services, testimonials and gallery entries only if those collections are empty. Change the sample reviews to verified customer-approved reviews before going live.

## 4. Run frontend and backend

Open two terminals from the project root.

Terminal 1 — API:

```bash
npm run server
```

Terminal 2 — Vite frontend:

```bash
npm run dev
```

Open:

- Website: http://localhost:5173
- CMS login: http://localhost:5173/admin
- API health: http://localhost:5000/api/health

Sign in with the admin email/password configured in `server/.env`.

## CMS features

- Dashboard: content counts, total enquiries, new enquiries and recent leads.
- Services: add, edit, delete, publish/hide, sort order and icon name.
- Testimonials: add, edit, delete, rating and publish/hide.
- Gallery: add, edit, delete, image URL and publish/hide.
- Enquiries: list, search, filter by status, click-to-call and update lead status.

Public website changes are read from the API. The public contact form writes enquiries to MongoDB. The website has fallback content so it can still render if the API is temporarily unavailable; enquiry submission requires the API.

## API overview

Public:
- `GET /api/health`
- `GET /api/content` — published services, testimonials and gallery
- `POST /api/enquiries` — validate and store a customer enquiry

Admin (Bearer JWT required):
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/admin/dashboard`
- `GET/POST /api/admin/services`
- `PUT/DELETE /api/admin/services/:id`
- `GET/POST /api/admin/testimonials`
- `PUT/DELETE /api/admin/testimonials/:id`
- `GET/POST /api/admin/gallery`
- `PUT/DELETE /api/admin/gallery/:id`
- `GET /api/enquiries` — search and filter
- `PATCH /api/enquiries/:id` — update status/internal note

## Deployment (assessment handover)

Deploy the API and frontend separately, then configure:

**Backend host (Node service)**
- Root directory: `server`
- Build: not required
- Start: `npm start`
- Add the production `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`, `CLIENT_URL` and `NODE_ENV=production` environment variables.
- `CLIENT_URL` must be the exact deployed frontend origin (no trailing slash). For multiple trusted origins, separate them with commas.
- Run the seed command once in the deployment environment after setting variables, or run it locally against the production database securely.

**Frontend static host**
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Set `VITE_API_URL=https://YOUR-API-DOMAIN/api` before building.

Use HTTPS for both deployments. Restrict Atlas Network Access to the backend provider's outbound IPs where practical. Rotate credentials if they are ever exposed. Do not use the Vite development server as production hosting.

## Notes / production checklist

- No real Atlas cluster can be connected from this generated project until you add your own Atlas URI and credentials.
- Admin authentication uses bcrypt password hashing and JWT bearer tokens. Tokens are stored in browser localStorage in this starter; for a higher-security production deployment, consider httpOnly secure cookies and CSRF protections.
- Add a password reset / admin user management workflow before a larger production rollout.
- Add image upload storage (Cloudinary, S3, etc.) if you do not want to paste public image URLs in the CMS.
- Verify business contact details, service descriptions, photos, reviews and permissions before publishing.
- Add privacy policy/consent wording appropriate to how customer phone numbers and enquiries are used.
- The admin UI is intentionally kept simple and dependency-light; extend it to match the public site's branding as desired.
