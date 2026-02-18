# DocForU 🚀

AI-powered resume enhancement and formatting tool.

DocForU allows users to upload resumes (PDF/DOCX/Image), securely validates the file using magic number detection, extracts text, and sends it to an AI API for improvement and restructuring.

---

## ✨ Features

- 📂 Resume Upload (PDF, DOCX, JPG, PNG)
- 🔐 Secure File Validation using Magic Numbers
- 📏 File Size Limit (10MB)
- 🧠 AI-powered resume enhancement
- ⚡ Memory-based file handling (no unsafe disk writes)

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- Multer (file upload handling)
- file-type (magic number validation)
- pdf-parse (PDF text extraction)
- mammoth (DOCX text extraction)

### Frontend
- React.js
- Tailwind CSS

### AI Integration
- External AI API (for resume enhancement)

---

## 🔐 Security Measures

- File validation using **magic number detection** (not just extension or MIME type)
- File size limited to **10MB**
- Memory storage used before validation
- Invalid file types are rejected immediately

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd DocForU
```

---

### 2️⃣ Install Backend Dependencies
```bash
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies
```bash
cd frontend
npm install
```