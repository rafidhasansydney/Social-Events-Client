# Bandhan ব্যবহার করার নিয়ম

Client হলো ব্রাউজারে দেখা Bandhan ওয়েবসাইট। Server পেছনে লগইন যাচাই ও database-এর তথ্য আদান-প্রদান করে। স্থানীয়ভাবে ব্যবহার করার সময় দুটোই চালু থাকতে হবে। লগইন করবেন ওয়েবসাইটে; server-এ আলাদা লগইন করার কোনো পেজ নেই।

## সাইট চালু থাকলে

ব্রাউজারে http://localhost:3000 খুলুন। একই client বা server আবার চালাবেন না।

1. Log in চাপুন।
2. Continue with Google দিয়ে নিজের Google account বেছে নিন, অথবা আগে তৈরি করা email/password ব্যবহার করুন।
3. লগইন হয়ে থাকলে উপরে নিজের ছবি বা নামের আদ্যক্ষর দেখা যাবে। আবার লগইন করতে হবে না।
4. Profile menu থেকে Create Event খুলুন। সরাসরি http://localhost:3000/create-event ঠিকানাতেও যাওয়া যায়।
5. শিরোনাম, বিবরণ, ইভেন্টের ধরন, মিলিত হওয়ার জায়গা, ভবিষ্যতের তারিখ ও সময় এবং ছবির সরাসরি URL দিন। কম্পিউটার থেকে ছবি upload করার সুবিধা এখন নেই।
6. Publish event চাপুন। সফল হলে Upcoming Events খুলবে এবং সেখানে ইভেন্টটি দেখা যাবে।

ছবির জন্য প্রকাশ্যে দেখা যায় এমন সরাসরি HTTP/HTTPS image URL ব্যবহার করুন; Google Images-এর search page-এর লিংক নয়।

Google login নিজের Google-এর পেজে হয়। Bandhan-এর কোনো ফর্মে Google password দিতে হয় না। Email/password login-এর ক্ষেত্রে Bandhan-এ নিবন্ধনের সময় দেওয়া password ব্যবহার করুন।

## কম্পিউটার বন্ধ করার পরে আবার চালানো

প্রথমে পুরো Social Development Events Platform ফোল্ডারটি editor-এ খুলুন। নিচের প্রতিটি terminal প্রজেক্টের মূল ফোল্ডার থেকে শুরু হবে।

প্রথম terminal-এ server চালান:

```powershell
cd .\server
npm run dev
```

`Server and database are ready on port 5000.` দেখালে server প্রস্তুত।

একটি নতুন terminal খুলে client চালান:

```powershell
cd .\client
npm run dev
```

তারপর http://localhost:3000 খুলুন। ব্যবহার করার সময় দুটি terminal চালু রাখুন। বন্ধ করতে প্রতিটি terminal-এ Ctrl+C চাপুন।

এই কম্পিউটারে dependencies ও স্থানীয় configuration আগে থেকেই আছে। প্রতিবার npm install, নতুন MongoDB account বা নতুন Google OAuth client তৈরি করতে হবে না।

## কোন অংশ এখন কাজ করে

- Email/password registration ও login।
- Google login, account page এবং logout।
- লগইন করে নতুন ইভেন্ট তৈরি।
- Upcoming Events-এ database থেকে ভবিষ্যতের ইভেন্ট দেখা।

Homepage-এর ছয়টি ইভেন্ট এখনো নমুনা। নিজের তৈরি ইভেন্ট দেখতে navbar-এর Upcoming Events বা http://localhost:3000/upcoming-events ব্যবহার করুন। Event details, Join Event, Joined Events, Manage Events এবং live deployment পরের ধাপগুলোর কাজ।

## সমস্যা হলে

- সাইট খুলছে না: client terminal চালু আছে কি না দেখুন।
- Account বা events লোড হচ্ছে না: server terminal-এ database প্রস্তুত হওয়ার বার্তা আছে কি না দেখুন।
- Internet/IP বদলানোর পরে database সংযোগ হচ্ছে না: MongoDB Atlas-এর IP Access List-এ নতুন connection IP যোগ করার প্রয়োজন হতে পারে।
- Port already in use দেখালে: একই client/server অন্য terminal-এ আগে থেকেই চালু থাকতে পারে। আগে চলমান সাইটটি খুলে দেখুন।

Server-এর `.env` এবং client-এর `.env.local` ব্যক্তিগত configuration। এগুলো GitHub-এ থাকে না। নতুন কম্পিউটারে প্রজেক্ট নামালে README ও `.env.example` দেখে আলাদাভাবে configuration সেট করতে হবে।
