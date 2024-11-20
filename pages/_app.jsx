"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const Header_1 = __importDefault(require("../components/Header"));
const footer_1 = __importDefault(require("../components/footer"));
const react_query_1 = require("@tanstack/react-query");
const react_query_devtools_1 = require("@tanstack/react-query-devtools");
require("../styles/reset.css");
function App({ Component, pageProps }) {
    const queryClient = new react_query_1.QueryClient();
    return (<>
      <react_query_1.QueryClientProvider client={queryClient}>
        <Header_1.default />
        <Component {...pageProps}/>
        <footer_1.default />
        <react_query_devtools_1.ReactQueryDevtools initialIsOpen={false}/>
      </react_query_1.QueryClientProvider>
    </>);
}
