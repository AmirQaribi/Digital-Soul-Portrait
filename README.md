# Digital Soul Portrait 👻

**Unveil your online essence as a spectral illustration.**

Digital Soul Portrait is a creative web application powered by the Google Gemini API. It acts as an AI artist, analyzing a conceptual social media profile to generate a poetic "digital soul" description and then designs a unique ghost character that visually represents the user's online essence.

<p align="center">
  <a href="https://ai.studio/apps/drive/17QV6psk0YIhKXNowdcv_p__oWX2ycfuL" target="_blank">
    <img src="https://img.shields.io/badge/Test%20The%20App-Launch-cyan?style=for-the-badge&logo=google-gemini" alt="Test the App">
  </a>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/be9f261c-853b-4a8b-a141-94ab0b4babaa" 
       alt="A screenshot of the Digital Soul Portrait app showing the input form on the left and a generated ghost and soul description on the right." 
       width="700">
</p>

---

## 🕯️ A Glimpse into the Ether: Gallery of Souls

Here are a few examples of **digital souls** given form by the AI —  
each with its own unique aura, memory, and whisper from the digital beyond.

| **The Banished Performer** | **The Weary Financier** | **The Wandering Coder** |
| :---: | :---: | :---: |
| <img width="280" alt="A ghost of an actor who posted about his last theater and love 🍌 emoji." src="https://github.com/user-attachments/assets/0086812b-d10a-4574-b97e-0fb81a15965a" /> | <img width="280" alt="A ghost of a bank manager who posted about war concerns with 😒 emoji." src="https://github.com/user-attachments/assets/30891bc1-26b2-4b0b-89fd-1adc17322cd0" /> | <img width="280" alt="A ghost of a developer who posted about hiking last weekend with 😊 emoji." src="https://github.com/user-attachments/assets/b6b380ed-a10e-4669-acac-2d94660a5fdc" /> |

<p align="center">
  <em>Each image is a fragment — a glimpse of consciousness reborn as data, shimmering between life and algorithm.</em>
</p>

---


## ✨ Features

-   **AI-Powered Personality Analysis**: Leverages Gemini 2.5 Pro to interpret user-provided text (bio, posts, moods) into a short, poetic "soul description."
-   **Unique Image Generation**: Uses Gemini 2.5 Flash Image to create a unique, 2D anime-style ghost sticker based on a descriptive prompt derived from the analysis.
-   **AI-Powered Suggestions**: Helps users fill out the form with creative suggestions for bios, posts, mood words, and emojis.
-   **The Ghost Gallery**: All generated ghost portraits are saved locally in your browser using IndexedDB, creating a personal gallery of your digital souls.
-   **Creative UI & Animations**: Features a futuristic, dark-mode UI with custom loading animations and interactive elements to create an engaging user experience.
-   **Client-Side Storage**: No backend or database required. All generated images are stored on the user's device for privacy and simplicity.
-   **Fully Responsive**: Designed to work beautifully on desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

This project is built with a modern, powerful tech stack:

-   **Frontend**: [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Model**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
    -   `gemini-2.5-pro` for text analysis and JSON generation.
    -   `gemini-2.5-flash-image` for image generation.
    -   `gemini-2.5-flash` for content suggestions.
-   **Client-Side Database**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) via the [`idb`](https://github.com/jakearchibald/idb) library.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later recommended)
-   A package manager like `npm` or `yarn`
-   A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/AmirQaribi/digital-soul-portrait.git
    cd digital-soul-portrait
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up your environment variables:**
    This project requires a Google Gemini API key. The application is configured to load this key from `process.env`. In a local development environment, you can simulate this by creating a `.env` file in the root of your project.

    Create a file named `.env` and add your API key:
    ```
    API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
    *Note: The development server is already configured to use a library like `dotenv` to load this file.*

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) to view it in the browser.

---

## 📂 Project Structure

The codebase is organized to be clean and maintainable.

```
/
├── public/
│   └── images/          # Project images for the README
├── src/
│   ├── components/      # Reusable React components (InputForm, Gallery, Loader, etc.)
│   ├── services/        # Modules for external interactions (Gemini API, IndexedDB)
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── index.tsx        # Entry point for the React application
├── .gitignore
├── index.html           # The main HTML file
├── package.json
└── README.md            # You are here!
```

---

## 🤝 Contributing

This project started as a conceptual MVP and is open for creative expansion. Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/AmirQaribi/digital-soul-portrait/issues).

How can you contribute?
-   Improve the UI/UX and add new animations.
-   Integrate with live APIs like X (formerly Twitter).
-   Enhance the prompting techniques for more varied results.
-   Refactor the code for better performance or readability.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is distributed under the MIT License.

```
MIT License

Copyright (c) 2024 Amir Qaribi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

-   Original concept inspired by an idea from [AmirQaribi](https://github.com/AmirQaribi).
-   Icons provided by the open-source community.
-   Powered by the incredible capabilities of the Google Gemini model.