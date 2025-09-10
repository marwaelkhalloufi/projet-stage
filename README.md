Backend (Laravel)
Installation
cd backend_project
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

Run Development Server
php artisan serve
# or with Vite
php artisan run dev

Frontend (React.js + Vite)
Installation
cd frontend_project
npm install

Run Development Server
npm run dev
