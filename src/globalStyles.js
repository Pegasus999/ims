import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
      box-sizing: border-box;
    	margin: 0;
      padding: 0;
      scroll-behavior: smooth;
      font-family: 'Raleway', sans-serif;
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      ::-webkit-scrollbar-thumb {
        background: #888;
      }
	  }

    body {
      background-color: var(--background);
    }

    :root {
      --green:#008060;
      --darker-green: #007b5c;
      --orange: #ffa500;
      --blue: #1560bd;
      --border: #202223;
      --border-gray: #e1e5e3;
      --background: #f6f6f7;
      --red: #d7283a;
      --lighter-red: #efabb2;
      --lighter-blue: #8bb9f2;
    }
`;
