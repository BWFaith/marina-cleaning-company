# Marina Cleaning Services Website
Pages: index, about, services, pricing, gallery, booking, areas, faq, contact (HTML) + css/style.css + js/main.js + js/config.js.
## Run
Open `index.html` in a browser, or upload the whole folder to any host.
## Booking emails (important)
Booking uses FormSubmit.co: the quote goes to the client, with a copy (CC) to marinacleaningservice01@gmail.com.
1. Upload the site online first, then submit one test booking.
2. Marina gets an "Activate form" email from FormSubmit. Click it once.
3. Change the owner email in `js/config.js` if needed.
## Replace images
Put your photos in `assets/images/` using the same names (before-2.svg, after-2.svg, office.svg, gym.svg, construction.svg...). If you use .jpg, update the file name in the HTML.
Add more gallery pairs by copying a `.ba` block in gallery.html.
## Logo
Header/footer use an SVG mark + script text. Swap the `<svg>` in each page with `<img src="assets/images/logo.png">` once you add your logo file.
## Edit
Colours: `:root` in css/style.css. Reviews, about story and areas contain sample text to replace.
