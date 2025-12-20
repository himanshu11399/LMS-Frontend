# 📚 Learning Management System (LMS) – Mobile App

A **role-based Learning Management System (LMS) mobile application** built using **React Native (Expo)**.  
The app provides **separate dashboards for Admin, Mentor, and Student**, focusing on **clean UI, modern UX, and scalable architecture**.

---

## 🚀 Features

### 👨‍💼 Admin Panel
- Admin dashboard with analytics
- View all users (Students & Mentors)
- Approve / reject mentor requests
- Monitor platform activity
- Manage system settings

### 🧑‍🏫 Mentor Panel
- Mentor dashboard with statistics
- Approve / reject students
- Create courses & chapters
- Assign courses to students
- Track student progress

### 🎓 Student Panel
- Personalized student dashboard
- Custom circular progress graphs (SVG based)
- View enrolled courses & progress
- Continue learning from last chapter
- Profile & account management

---

## 🛠 Tech Stack

- **React Native (Expo)**
- **Expo Router**
- **TypeScript**
- **Axios**
- **AsyncStorage**
- **react-native-svg**
- **Expo Linear Gradient**
- **Node.js + Express**
- **MongoDB**

---

## 📱 App Screenshots

> Images are resized using HTML for proper GitHub display.
>
> ADMIN
>
> <p align="center"> <img src="https://github.com/user-attachments/assets/96ef2029-1192-433f-b15f-e7e2c6251889" width="200" height="400" /> <img src="https://github.com/user-attachments/assets/74b57f38-76f4-49ff-9312-ba7915577fbf" width="200" height="400" /> <img src="https://github.com/user-attachments/assets/ad1d588b-58af-4ea3-90f3-5bcd1b5d3af6" width="200" height="400" /> </p> <p align="center"> <img src="https://github.com/user-attachments/assets/4cf9fc66-83eb-479d-84fa-3c62a4244fb6" width="200" height="400" /> <img src="https://github.com/user-attachments/assets/60269800-7d6f-45ea-9f43-bf3f87b4a6af" width="200" height="400" /> </p>


MENTOR
<p align="center"> <img src="https://github.com/user-attachments/assets/8e61a246-8106-4782-aa09-d0e12b4c7b18" width="200" height="400" /> <img src="https://github.com/user-attachments/assets/d6685785-f7d4-4910-a7b3-ffedc20033e0" width="200" height="400" /> <img src="https://github.com/user-attachments/assets/3f506737-00a2-4a88-b079-29532624f214" width="200" height="400" /> </p> <p align="center"> <img src="https://github.com/user-attachments/assets/38fb03f2-aa80-495e-835a-ac21d24640a3" width="200" height="400" /> <img src="https://github.com/user-attachments/assets/79f1823c-2bec-4be6-bbfa-0e412a0cc779" width="200" height="400" /> </p>


STUDENT
<p align="center"> <img src="https://github.com/user-attachments/assets/d907fd4f-80bf-4356-87e4-50044c28fa57" width="200" height="400" /> <img src="https://github.com/user-attachments/assets/b61f54d9-b2c0-4bf5-bc9e-3723db33416d" width="200" height="400" /> <img src="https://github.com/user-attachments/assets/1903b73a-32e9-432c-9974-bfa4fbf25963" width="200" height="400" /> </p> <p align="center"> <img src="https://github.com/user-attachments/assets/32669f44-9e78-4108-bf4e-7d2272862b09" width="200" height="400" /> </p>













---

## 📂 Project Structure

```bash
app/
 ├─ (auth)              # Login / Signup
 ├─ (admintabs)         # Admin screens
 ├─ (mentortabs)        # Mentor screens
 ├─ (studenttabs)       # Student screens
 ├─ _layout.tsx
 └─ index.tsx

src/
 ├─ api/                # Axios config
 ├─ services/           # Common API services
 ├─ admin/              # Admin APIs
 ├─ mentor/             # Mentor APIs
 ├─ student/            # Student APIs
 └─ utils/
