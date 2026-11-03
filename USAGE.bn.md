# Bandhan ব্যবহার করার নিয়ম

Client হলো ব্রাউজারে দেখা Bandhan ওয়েবসাইট। Server পেছনে লগইন যাচাই ও database-এর তথ্য আদান-প্রদান করে। স্থানীয়ভাবে ব্যবহার করার সময় দুটোই চালু থাকতে হবে। লগইন করবেন ওয়েবসাইটে; server-এ আলাদা লগইন করার কোনো পেজ নেই।

## সাইট চালু থাকলে

ব্রাউজারে http://localhost:3000 খুলুন। একই client বা server আবার চালাবেন না।

1. Log in চাপুন।
2. Continue with Google দিয়ে নিজের Google account বেছে নিন, অথবা আগে তৈরি করা email/password ব্যবহার করুন।
3. লগইন হয়ে থাকলে উপরে নিজের ছবি বা নামের আদ্যক্ষর দেখা যাবে। আবার লগইন করতে হবে না।
4. Profile menu থেকে Create Event খুলুন। সরাসরি http://localhost:3000/create-event ঠিকানাতেও যাওয়া যায়।
5. শিরোনাম, বিবরণ, ইভেন্টের ধরন, মিলিত হওয়ার জায়গা এবং ভবিষ্যতের তারিখ ও সময় দিন। Event photo-তে Choose a photo চেপে ফোনের গ্যালারি বা কম্পিউটার থেকে ছবি বেছে নিন।
6. Publish event চাপুন। সফল হলে Upcoming Events খুলবে এবং সেখানে ইভেন্টটি দেখা যাবে।

ছবি JPG, PNG বা WebP হতে হবে এবং 4 MB-এর মধ্যে হতে হবে। ছবি বাছলে upload হবে ও preview দেখা যাবে। লিংক ব্যবহার করতে চাইলে Or use an image link খুলুন; এখানে সরাসরি image URL দিতে হবে, Google Images-এর search page-এর লিংক নয়।

## নিজের প্রোফাইল সম্পাদনা

Profile menu → Your account খুলুন, অথবা http://localhost:3000/account যান। এখানে নাম, প্রোফাইল ছবি, নিজের এলাকা এবং ছোট bio বদলাতে পারবেন। ছবি গ্যালারি বা কম্পিউটার থেকে বেছে দেওয়া যায়। Save changes চাপলে পরিবর্তন সেভ হবে; Cancel changes চাপলে আগের তথ্য ফিরে আসবে। Email লগইনের পরিচয় হিসেবে দেখানো হবে।

Email দিয়ে registration-এর সময়ও গ্যালারি বা কম্পিউটার থেকে প্রোফাইল ছবি বেছে দিতে পারবেন। Account তৈরি হওয়ার পরে ছবিটি upload হয়। Upload ব্যর্থ হলে প্রোফাইল থেকে আবার ছবি যোগ করতে পারবেন।

## ইভেন্ট খোঁজা ও যোগ দেওয়া

Homepage-এ database থেকে সবচেয়ে কাছের তারিখের সর্বোচ্চ ৬টি ইভেন্ট দেখা যায়। কম ইভেন্ট তৈরি থাকলে ততটিই দেখাবে। Upcoming Events-এ সব ভবিষ্যতের ইভেন্ট দেখা যাবে। Cause বেছে filter করুন, অথবা Search ঘরে ইভেন্টের নাম/এলাকা লিখে Search চাপুন।

1. ইভেন্টের View Event চাপুন।
2. Details-এ বিবরণ, ছবি, স্থান, তারিখ ও সময় দেখুন। লগইন ছাড়াও এই পেজ দেখা যায়।
3. যোগ দিতে Join Event চাপুন। লগইন করা না থাকলে Log in to join চাপুন; login-এর পরে একই ইভেন্টে ফিরে আসবেন।
4. সফল হলে You’re on the list দেখাবে। Reload করলেও এটি থাকবে। একই ইভেন্টে আবার যোগ দেওয়ার প্রয়োজন নেই।

নিজের ইভেন্টে Join Event থাকবে না। সেখানে আপনি যে organiser, সেটি দেখাবে এবং Manage Event / Edit details পাবেন। অন্য কারও ইভেন্টে join করলে Joined Events তালিকায় সেটি দেখা যাবে।

ইভেন্ট শুরু হয়ে গেলে নতুন করে join করা যাবে না। Copy link দিয়ে অন্য কাউকে ইভেন্টের লিংক দেওয়া যায়।

## নিজের ইভেন্ট edit বা delete করা

1. Navbar বা profile menu থেকে Manage Events খুলুন: http://localhost:3000/manage-events।
2. নিজের প্রতিটি ইভেন্টের পাশে Edit ও Delete পাবেন।
3. Edit চাপলে পুরোনো তথ্যসহ form খুলবে। তথ্য বা ছবি বদলে Save changes চাপুন। Cancel changes চাপলে তালিকায় ফিরে আসবেন।
4. Delete চাপলে confirmation খুলবে। Keep event চাপলে কিছু মুছবে না। Delete event চাপলে ইভেন্ট এবং সেটির join রেকর্ড মুছে যাবে। এই কাজ ফিরিয়ে আনা যায় না।

অন্য কারও ইভেন্ট edit/delete করা যাবে না। নিজের পুরোনো ইভেন্টের বাকি তথ্য বদলানোর সময় তার আগের তারিখ রাখা যায়; নতুন তারিখ দিলে ভবিষ্যতের তারিখ দিতে হবে।

## নিজের joined events দেখা

Joined Events খুলুন: http://localhost:3000/joined-events। এখানে অন্যদের যেসব ইভেন্টে যোগ দিয়েছেন সেগুলো তারিখ অনুযায়ী থাকবে। All, Upcoming ও Past দিয়ে তালিকা বেছে দেখা যায়। Organiser তথ্য বদলালে এখানে নতুন তথ্যই দেখা যাবে। নিজের তৈরি ইভেন্টগুলো Manage Events-এ থাকবে।

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
- গ্যালারি/কম্পিউটার থেকে ইভেন্ট ও প্রোফাইলের ছবি upload।
- নিজের প্রোফাইলের নাম, ছবি, এলাকা ও bio সম্পাদনা।
- Homepage-এ সর্বোচ্চ ৬টি সত্যিকারের upcoming event।
- ইভেন্টের ধরন ও নাম/এলাকা দিয়ে খোঁজা, public details দেখা এবং join করা।
- নিজের ইভেন্ট edit/delete করা এবং Joined Events-এর আলাদা তালিকা দেখা।

Theme পরিবর্তন এবং live deployment পরের ধাপগুলোর কাজ।

## সমস্যা হলে

- সাইট খুলছে না: client terminal চালু আছে কি না দেখুন।
- Account বা events লোড হচ্ছে না: server terminal-এ database প্রস্তুত হওয়ার বার্তা আছে কি না দেখুন।
- Internet/IP বদলানোর পরে database সংযোগ হচ্ছে না: MongoDB Atlas-এর IP Access List-এ নতুন connection IP যোগ করার প্রয়োজন হতে পারে।
- Port already in use দেখালে: একই client/server অন্য terminal-এ আগে থেকেই চালু থাকতে পারে। আগে চলমান সাইটটি খুলে দেখুন।

Server-এর `.env` এবং client-এর `.env.local` ব্যক্তিগত configuration। এগুলো GitHub-এ থাকে না। নতুন কম্পিউটারে প্রজেক্ট নামালে README ও `.env.example` দেখে আলাদাভাবে configuration সেট করতে হবে।
