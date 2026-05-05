NRW Budget Management System - Firebase Firestore Auto Save Version

How to use:
1. Open index.html in a browser.
2. Fill the contract details using the form.
3. Click Add Row. The row is saved directly to Firebase Firestore automatically.
4. Click Edit to edit an existing row, then click Update Row. The updated row is saved directly to Firebase Firestore automatically.
5. Click Delete to remove a row from both the table and Firebase Firestore immediately.
6. Use Clear All to delete all records from both the table and Firebase Firestore.
7. Use Search to filter records in the table.

Firestore collection used:
- nrwBudgetRecords

Files included:
- index.html
- css/style.css
- js/app.js
- firestore.rules
- README.txt

Important updates:
- Save All button has been removed.
- Add Row now auto-saves to Firebase Firestore.
- Update Row now auto-saves to Firebase Firestore.
- Delete now deletes directly from Firebase Firestore.
- Allocation 2026, Expenditure 2026, Bills in Finance, and Bills in Hand are text fields.
- Export CSV function is removed.
- Input boxes are blank without default values or placeholders.

Firestore rules:
The firestore.rules file contains open testing rules that allow public read/write access.
Use those only for testing or private controlled use. For production, add Firebase Authentication and restrict access.
