This application is to create the API for the hall booking app with the following conditions

Return both room and customer data "/" -> home - get method

1. Create a Room with (/rooms/create-room) > post method
   -> Number of seats available
   -> Amenities in room 
   -> Price for 1 hour

2. Book a Room with (/rooms/book-room/:id) id- room id > put method
   -> Customer Name 
   -> Date 
   -> Start time
   -> End time 
   -> Room ID

3. List all the Customers with booked data with (/customers) > get method
   -> Customer Name
   -> Room Name
   -> Date
   -> Start time
   -> End time

4. List all the Rooms with booked data with (/rooms/booked-rooms) > get method
   -> Room Name 
   -> Booked Status 
   -> Customer Name 
   -> Date 
   -> Start time 
   -> End time 
