// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Light";
export const SITE_DESCRIPTION = "Hello";
export const URLS = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/blog", text: "Todos" },
  { href: "/collection", text: "Collection" },
  { href: "/contact", text: "Contact" },

];
export type Post ={
  title: string;
  date: Date;
  description: string;
  tags: string[];
  image: string;
  link: string;
  content: string;
}