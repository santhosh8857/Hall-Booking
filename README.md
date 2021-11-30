This application is to create the API for the hall booking app with the following conditions

1. Create a Room with -> post for room DB /create-room
   -> Number of seats available(d)
   -> Amenities in room (d)
   -> Price for 1 hour (d)

2. Book a Room with put for room DB /book-room
   -> Customer Name (d)
   -> Date (d)
   -> Start time (d)
   -> End time (d)
   -> Room ID(d)

3. List all the Customers with booked data with get for customers DB /customers
   -> Customer Name
   -> Room Name
   -> Date
   -> Start time
   -> End time

4. List all the Rooms with booked data with get for customers DB only limited field /rooms
   -> Room Name (d)
   -> Booked Status (d)
   -> Customer Name (d)
   -> Date (d)
   -> Start time (d)
   -> End time (d)
