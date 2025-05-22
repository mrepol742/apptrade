# Apptrade POS

[![Build CI](https://github.com/mrepol742/apptrade-pos/actions/workflows/build.yml/badge.svg)](https://github.com/mrepol742/apptrade-pos/actions/workflows/build.yml)
[![Dependabot Updates](https://github.com/mrepol742/apptrade-pos/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/mrepol742/apptrade-pos/actions/workflows/dependabot/dependabot-updates)

## Pre-requisites

- Node.js v23.^
- PHP v8.2^
- Composer
- XAMPP (preferred) / Mysql Server

---

### **1. Setup and Initialization**

- **Install Dependencies**  

  ```sh
  npm run i
  ```

- **Setup Environments**  

  ```sh
  cd server && cp .env.example .env
  ```

---

### **1.1. Setup and Initialization Printer Server**

- **Clone Printer Server Repository**

  ```sh
  git clone https://github.com/mrepol742/printer-server
  ```

- **Setup Environments**  

  ```sh
  cd printer-server && cp .env.example .env
  ```

  Update the following variables in your `.env` file:

  - **`STORE_NAME`**: The name of your store.
  - **`PRINTER_NAME`**: The exact name of the printer to use.

  > **Note:**  
  > Ensure printer sharing is enabled for the selected printer so the application can access it.

- **Start Application**  

  ```sh
  composer run start
  ```

### **2. Application Development**

- **Start Application**  

  ```sh
  npm run start
  ```

- **Lint Code**  

  ```sh
  npm run lint
  ```
---

## License

This project is licensed under the **MIT License with Commons Clause**.

- **Commercial Use Restriction**: You may not use the software for commercial purposes, as defined in the [LICENSE](LICENSE) file. Commercial use includes using the software as part of any service offered for a fee or any use that generates revenue either directly or indirectly.

See the full [LICENSE](LICENSE) file for more details.