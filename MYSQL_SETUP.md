# MySQL Database Setup Guide

## Option 1: Install MySQL Locally (Recommended for Development)

### Windows Installation:

1. **Download MySQL:**
   - Visit https://dev.mysql.com/downloads/installer/
   - Download "MySQL Installer for Windows"
   - Choose the "mysql-installer-community" version

2. **Install MySQL:**
   - Run the installer
   - Choose "Developer Default" or "Server only" setup type
   - Click "Execute" to install
   - During configuration:
     - Choose "Development Computer" for Config Type
     - Keep default port: 3306
     - Set a root password (remember this!)
     - Create a Windows Service (recommended)

3. **Verify Installation:**
   ```powershell
   mysql --version
   ```

4. **Create Database:**
   ```powershell
   # Login to MySQL
   mysql -u root -p
   # Enter your password when prompted
   
   # Create database
   CREATE DATABASE wedora_db;
   
   # Verify database created
   SHOW DATABASES;
   
   # Exit MySQL
   exit;
   ```

5. **Update Backend .env File:**
   - Open `backend/.env`
   - Update `DB_PASSWORD` with your MySQL root password
   - Keep other settings as is (or create a new user - see below)

### Creating a Dedicated Database User (Optional but Recommended):

```sql
# Login as root
mysql -u root -p

# Create a new user
CREATE USER 'wedora_user'@'localhost' IDENTIFIED BY 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON wedora_db.* TO 'wedora_user'@'localhost';

# Apply changes
FLUSH PRIVILEGES;

# Exit
exit;
```

Then update your `.env`:
```
DB_USERNAME=wedora_user
DB_PASSWORD=your_secure_password
```

## Option 2: Using XAMPP (Includes MySQL)

1. **Download XAMPP:**
   - Visit https://www.apachefriends.org/
   - Download for Windows
   - Install XAMPP

2. **Start MySQL:**
   - Open XAMPP Control Panel
   - Click "Start" next to MySQL

3. **Access phpMyAdmin:**
   - Click "Admin" next to MySQL in XAMPP
   - Or visit: http://localhost/phpmyadmin
   - Create database named `wedora_db`

4. **Update .env:**
   ```
   DB_PASSWORD=
   ```
   (XAMPP's default MySQL has no password)

## Option 3: Using Docker (Advanced)

```powershell
# Create docker-compose.yml in project root
docker-compose up -d
```

See `docker-compose.yml` file in project root.

## Verify Connection

After setting up MySQL and updating `.env`:

```powershell
# Navigate to backend
cd backend

# Start the NestJS server
npm run start:dev
```

You should see: "Database connected successfully" or similar message without errors.

## Common Issues

### Issue: "ER_NOT_SUPPORTED_AUTH_MODE"
**Solution:** Update MySQL authentication method
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### Issue: "Can't connect to MySQL server"
**Solutions:**
- Ensure MySQL service is running
- Check if port 3306 is not blocked by firewall
- Verify DB_HOST, DB_PORT in .env file

### Issue: "Access denied for user"
**Solutions:**
- Double-check DB_USERNAME and DB_PASSWORD in .env
- Ensure the user has proper permissions
- Try logging in directly with mysql client to verify credentials

## Next Steps

Once MySQL is set up and the backend connects successfully:

1. Create your database entities (models)
2. TypeORM will auto-create tables when `synchronize: true` (development only!)
3. For production, use migrations instead of synchronize

## Resources

- MySQL Documentation: https://dev.mysql.com/doc/
- TypeORM Documentation: https://typeorm.io/
- NestJS Database: https://docs.nestjs.com/techniques/database
