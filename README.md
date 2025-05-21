## KoinX Tax Loss Harvesting Tool



This is a single-page React application that simulates a Tax Loss Harvesting tool, allowing users to view their crypto holdings, pre-harvesting capital gains/losses, and see the impact of selecting specific holdings for harvesting on their overall tax liability.


## Features



-   **Pre-Harvesting Gains:** Displays initial Short-term and Long-term Capital Gains (STCG/LTCG) and losses.

-   **After-Harvesting Impact:** Dynamically updates STCG/LTCG and overall realized gains based on selected holdings, simulating tax loss offsetting.

-   **Holdings Table:**

    -   Displays coin name, current market rate, total current value, average buy price, STCG/LTCG gain/loss for each holding, and PNL.

    -   Allows individual selection of holdings for harvesting simulation.

    -   "Select All" / "Deselect All" functionality.

    -   Sortable columns for better data organization.

    -   "View All" / "View Less" button to toggle visibility of all holdings.

-   **Informational Sections:** "How it works?" and "Important Notes & Disclaimers" for user guidance.

-   **Responsive Design:** Optimized for both desktop and mobile viewing.



## Screenshots





### Desktop View (Overall)
![image](https://github.com/user-attachments/assets/e0e96571-fb8e-4dfa-9d0d-df6daa3c0766)




### Desktop View (Harvesting Cards)

![image](https://github.com/user-attachments/assets/b76cda9d-3f63-42dc-ad83-51503fc08291)




### Desktop View (Holdings Table)
![image](https://github.com/user-attachments/assets/e3b833b5-dc79-486f-b379-94395047640a)





### Mobile View

![image](https://github.com/user-attachments/assets/8c036378-804f-4dd2-a4a8-2e8e3556d586)






## Tech Stack



-   **React.js:** Frontend library

-   **CSS:** For styling (pure CSS, no frameworks)



## Setup Instructions



To run this project locally, follow these steps:



1.  **Clone the repository:**

    ```bash

    git clone [https://github.com/GreeshmanthBommireddy/KoinX---Tax-Loss-Harvesting.git](https://github.com/GreeshmanthBommireddy/KoinX---Tax-Loss-Harvesting.git)

    cd koinx-tax-loss-harvesting

    ```


2.  **Install dependencies:**

    ```bash

    npm install

    # or if you use yarn

    # yarn install

    ```



3.  **Run the development server:**

    ```bash

    npm start

    # or

    # yarn start

    ```

    The application will open in your browser at `http://localhost:3000`.



## Assumptions



-   **Data Simulation:** All data (capital gains and holdings) is simulated locally within `src/data/`. In a real-world application, this data would typically come from an API.

-   **Loss Offsetting Logic:** The `calculateHarvestedGains` function implements a simplified loss offsetting logic where:

    1.  Short-term losses first offset short-term profits.

    2.  Long-term losses first offset long-term profits.

    3.  Remaining short-term losses can then offset long-term profits.

    (This is a common, but simplified, approach for demonstration purposes and does not cover all complex tax rules, especially regarding loss carry-forward.)

-   **Currency:** The default currency symbol is `₹` (Indian Rupee).

-   **Image Assets:** Placeholder image paths for crypto logos are assumed to be in `public/assets/`. You should place actual `.png` or `.svg` files there, or update the `logo` URLs in `src/data/holdingsData.js` to external URLs.
