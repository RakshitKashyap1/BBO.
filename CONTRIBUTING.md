# Contributing to BBO. (Billboard Organiser) 🏙️

Welcome, billboard aficionado! We're thrilled that you want to help us make BBO. even more spectacular. Here are some guidelines to help you get started.

---

## 🛠️ Development Workflow

1.  **Fork it**: Create your own copy of the repo.
2.  **Branch it**: Create a descriptive branch (e.g., `feature/add-payment-gateway` or `fix/button-shadow`).
3.  **Setup local env**: Use our automagic setup scripts:
    -   Run `./setup.ps1` (Windows) or `./setup.sh` (Unix).
4.  **Code it**: Follow the Neo-Brutalist design philosophy (see below).
5.  **Test it**: Ensure both frontend and backend are running smoothly.
6.  **Commit it**: Write clear, concise commit messages.
7.  **PR it**: Submit a Pull Request and describe what you've changed!

---

## 🎨 Design Philosophy: Neo-Brutalism

If you're adding new UI components, keep these rules in mind:

-   **Borders**: Everything needs a 3px solid black border.
-   **Shadows**: Use thick (4px-8px) solid black offsets. No soft blurs!
-   **Typography**: Bold headings, clear buttons. We love high contrast.
-   **Colors**: Use our established palette (Indigo, Pink, Yellow, and lots of white/black).

---

## 🏗️ Backend Conventions (Django)

-   **Versioned API**: Always use `/api/v1/...` for your endpoints.
-   **Fat Models, Thin Views**: Keep logic in models or dedicated service layers.
-   **Documentation**: Add clear comments to your functions and classes.
-   **Migrations**: Always run `python manage.py makemigrations` and commit them.

---

## 🏎️ Frontend Conventions (React)

-   **Functional Components**: Use Hooks (useState, useEffect, etc.).
-   **Reusable Components**: If a button looks the same twice, make it a component.
-   **Environment Variables**: Never hardcode API URLs! Use `import.meta.env.VITE_API_URL`.

---

## 🤝 Code of Conduct

Be kind, help others, and don't make the shadows too blurry. We like them crisp!

---

_Need help? Reach out in the issues or start a discussion._ 🚀
