# Frontend Mentor - Personal finance app solution

This is a solution to the [Personal finance app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/personal-finance-app-JfjtZgyMt1). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- See all of the personal finance app data at-a-glance on the overview page
- View all transactions on the transactions page with pagination for every ten transactions
- Search, sort, and filter transactions
- Create, read, update, delete (CRUD) budgets and saving pots
- View the latest three transactions for each budget category created
- View progress towards each pot
- Add money to and withdraw money from pots
- View recurring bills and the status of each for the current month
- Search and sort recurring bills
- Receive validation messages if required form fields aren't completed
- Navigate the whole app and perform all actions using only their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account and log in (add user authentication to the full-stack app)

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Tailwind css](https://tailwindcss.com/) - For styles
- [TanStack Query](https://tanstack.com/query/latest) - For data fetching and state management
- [Supabase](https://supabase.com/) - Backend & Database

### What I learned

During this project, I focused on building a scalable architecture and a highly accessible user experience.

#### 🚀 Navigation & Layout

- **Responsive Navigation:** Engineered a bottom-nav system for mobile that uses **React Router's `NavLink`** for automatic route tracking and active state styling.
- **Smart NavButtons:** Created dynamic components that handle SVG rendering and utilize **CSS variables** for seamless theme synchronization.
- **Accessibility First:** Integrated `aria-label` attributes and high-visibility `focusable-ring` indicators to ensure full keyboard navigability.

#### 🏗️ Architecture & UI Patterns

- **Compound Component Pattern:** Implemented a flexible Menu and Modal system, allowing for decoupled but synchronized sub-components (e.g., `Menu.Toggle`, `Menu.List`).
- **Advanced Focus Management:** Developed custom **focus traps** and **focus restoration** logic to meet WCAG accessibility standards for modal interfaces.
- **SVG Icon Library:** Built an optimized, accessible SVG library wrapped in a `NavIconWrapper` for consistent scaling and color inheritance.

```jsx
//Example of how I implemented the Compound Component Pattern for the Menu and Modal
   <Menus.Toggle id={id} name={name} />

       <Menus.List id={id}>
          <Modal.Open
            modalName={`edit-pot-${id}`}
            returnToSelector={`#menu-trigger-${id}`}
          >
            <Menus.Button color={"text-contain-main"}>Edit pot</Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window
          titleId={`edit-pot-title-${id}`}
          contentId={`edit-pot-desc-${id}`}
          modalName={`edit-pot-${id}`}
        >
          <PotForm potModalType={`edit-pot-${id}`} potToEdit={pot} />
        </Modal.Window>
```

#### 💰 Financial Logic & State

- **TanStack Query Integration:** Managed complex CRUD operations with real-time **Balance Synchronization**. Adding or withdrawing from a pot automatically triggers a re-validation of the global balance.
- **Constraint-Based Validation:** Leveraged **React Hook Form** to enforce business rules, such as preventing withdrawals that exceed a pot's current total or ensuring unique color-tag selection.

#### 🛡️ Feedback & Safety

- **Global Toast System:** Designed a context-based notification system to provide immediate user feedback on asynchronous database mutations.
- **Resilient UI:** Implemented `ErrorFallback` components to handle API failures gracefully without crashing the entire application.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
