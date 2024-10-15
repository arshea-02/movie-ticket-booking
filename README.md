# Movie Ticket Reservation
- MERN project that allows users to book a movie show's seat(s).
- JWT tokenization for verification
- Ethereal and Nodemailer used for sendign confirmation emails
- REST APIs are used in the backend
- Assigned unique custom IDs to admins, users, movies and shows
- Different navigation bar for Admin and User interface
## Admin Privileges
- @admin is the domain for admin users
- Signup, Login
- Add, remove and edit movies
- Add, remove and edit Shows
- Shows with conflicting times can not be added
## User Privileges
- Signup, Login
- User Authentication
- View Movies and shows
- Book seat for a show
- An already booked seat cannot be booked again for the same show
