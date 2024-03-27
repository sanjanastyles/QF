
## Todo
 - Clean the Code
 - Encrypt Stuff(password and stuff) 
 - secure endpoints
 - Css changes


## Front End

### Structure

- **Entry File**: `app.js`
- **How to Start**:
  - Install dependencies: `npm i`
  - Start the application: `npm run start`


### Routes

#### Common Routes

- **Home**: `/`
- **Sign In**: `/SignIn`
- **Sign Up**: `/SignUp`
- **OTP Page**: `/SignUp/otp`
- **Categories**: `/Categories`
- **Contact Us**: `/Contact-Us`
- **Checkout Form**: `/checkout/:proId/:category`
- **Client Orders**: `/Orders`
- **Online Professionals**: `/online/professionals`
- **Chat Page**: `/chat/:s/:c/:b`

#### Professional Routes

- **Professional Dashboard**: `/professionals/dashboard/:id/:serviceId`
- **Professional Profile**: `/professional/:professionalId`

#### Admin Routes

- **Admin List**: `/admins`
- **New Admin**: `/newAdmin`
- **Admin Dashboard**: `/admin-dashboard`
- **User List**: `/users`
- **Service List**: `/services`
- **New Service**: `/newService`
- **Admin Details**: `/admin/:adminId`
- **Service Details**: `/service/:ServiceId`
- **User Details**: `/user/:userId`

#### Services Routes

- **All Services**: `/Categories/:category`
- **Service Page**: `/categories/:category/:subCategory`

#### Other Routes

- **User Dashboard**: `/dashboard`
- **Register as Professional**: `/RegisterAsProfessional`
- **Under Construction Page**: `/under-construction`
- **Success Page**: `/success.html`
- **Error Page**: `*`



### Structure

- **Entry File**: `app.js`
- **How to Start**:
  - Install dependencies: `npm i`
  - Start the application: `npm run start`

### Routes

1. **Admin**
2. **Profesional**
3. **Customer**

## Backend End

### Structure

- **Entry File**: `app.ts`
- **How to Start**:
  - Install dependencies: `npm i`
  - Start the development server: `npm run dev`
  - Start the production server: `npm run start`


### Routes

#### Admin Controller

- **GET /admin/users**
  - Description: Retrieves all users.
  - Controller Method: `adminController.handleAllUsers`

- **GET /admin/get/admin**
  - Description: Retrieves all admin users.
  - Controller Method: `adminController.handleAllAdmin`

- **POST /admin/create/service**
  - Description: Creates a new service.
  - Controller Method: `adminController.handleAddService`

- **POST /admin/create/admin**
  - Description: Creates a new admin user.
  - Controller Method: `adminController.handleCreateAdmin`

- **POST /admin/block**
  - Description: Blocks a user.
  - Controller Method: `adminController.handleBlock`

<!-- - **GET /admin/abc**
  - Description: Endpoint description.
  - Controller Method: Endpoint Handler

- **POST /admin/xyz**
  - Description: Endpoint description.
  - Controller Method: Endpoint Handler -->

  #### ServiceMan Controller

- **POST /serviceman/login**
  - Description: Handles login for service providers.
  - Controller Method: `serviceManController.handleLogin`

- **POST /serviceman/signup**
  - Description: Handles signup for service providers.
  - Controller Method: `serviceManController.handleSignup`

- **GET /serviceman/profile**
  - Description: Retrieves service provider profile.
  - Middleware: `auth`
  - Controller Method: `serviceManController.handleProfile`

- **POST /serviceman/profile**
  - Description: Updates service provider profile.
  - Middleware: `auth`
  - Controller Method: `serviceManController.handleProfilePost`

- **GET /serviceman/see/reviews**
  - Description: Retrieves reviews for the service provider.
  - Controller Method: `serviceManController.handleSeeReviews`

- **GET /serviceman/service**
  - Description: Retrieves services provided by the service provider.
  - Controller Method: `serviceManController.handleServiceManService`

- **GET /serviceman/cancel/booking**
  - Description: Cancels a booking made by the service provider.
  - Controller Method: `serviceManController.handleCancelBooking`

- **GET /serviceman/confirm/booking**
  - Description: Confirms a booking made by the service provider.
  - Controller Method: `serviceManController.handleConfirmBooking`


#### Customer Controller

- **POST /customer/review**
  - Description: Handles posting reviews by customers.
  - Controller Method: `customerController.handleReviewPost`

- **GET /customer/online/serviceman**
  - Description: Retrieves all online service providers.
  - Controller Method: `customerController.getAllOnlineServiceMan`

#### Common Controller

- **POST /common/contact**
  - Description: Handles submission of contact form.
  - Controller Method: `commonController.handleContactForm`

- **POST /common/booking**
  - Description: Handles booking requests.
  - Controller Method: `commonController.handleBooking`

- **GET /common/allservice**
  - Description: Retrieves all available services.
  - Controller Method: `commonController.handleAllService`

- **GET /common/service/:serviceName**
  - Description: Retrieves details of a specific service.
  - Controller Method: `commonController.handleService`

- **GET /common/profile**
  - Description: Retrieves user profile information.
  - Controller Method: `commonController.handleProfile`

- **GET /common/history**
  - Description: Retrieves user booking history.
  - Controller Method: `commonController.handleHistory`

- **GET /common/users/profile**
  - Description: Retrieves user profile information.
  - Controller Method: `commonController.getUserProfile`

- **GET /common/delete/booking**
  - Description: Deletes a booking.
  - Controller Method: `commonController.deleteBooking`

- **GET /common/online**
  - Description: Handles user going online.
  - Controller Method: `commonController.handleOnline`

- **GET /common/offline**
  - Description: Handles user going offline.
  - Controller Method: `commonController.handleOffline`

- **GET /common/logout**
  - Description: Handles user logout.
  - Controller Method: `commonController.handleLogOut`

- **POST /common/forgotpassword**
  - Description: Handles forgot password requests.
  - Controller Method: `commonController.handleForgotPassword`

- **POST /common/get/conversation**
  - Description: Retrieves conversations.
  - Controller Method: `messageController.getConversations`

- **POST /common/post/message**
  - Description: Sends a message.
  - Controller Method: `messageController.sendMessage`


## Getting Started

To get started with this project, follow these steps:

1. **Front End**:
   - Navigate to the front end directory.
   - Run `npm i` to install dependencies.
   - Start the application using `npm run start`.

2. **Back End**:
   - Navigate to the back end directory.
   - Run `npm i` to install dependencies.
   - For development, start the server using `npm run dev`.
   - For production, start the server using `npm run start`.

## Notes

- Make sure you have Node.js and npm installed on your system.
- Ensure that both front end and back end servers are running simultaneously for full functionality.
