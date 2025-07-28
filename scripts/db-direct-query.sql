-- CareBridge Database Direct Inspection Queries
-- Use these in Neon Console SQL Editor or any PostgreSQL client

-- 1. View all tables in your database
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. Check clinic table structure
\d clinics;

-- 3. View all clinic data
SELECT 
    id,
    name,
    region,
    phone,
    fax,
    email,
    accepting_new,
    is_active,
    created_at
FROM clinics 
ORDER BY region, name
LIMIT 20;

-- 4. Count clinics by region
SELECT 
    COALESCE(region, 'No Region') as region,
    COUNT(*) as clinic_count,
    COUNT(CASE WHEN accepting_new = true THEN 1 END) as accepting_new_count
FROM clinics 
WHERE is_active = true
GROUP BY region 
ORDER BY clinic_count DESC;

-- 5. Check data quality - missing contact info
SELECT 
    'Missing Phone' as issue,
    COUNT(*) as count
FROM clinics 
WHERE phone IS NULL AND is_active = true

UNION ALL

SELECT 
    'Missing Email' as issue,
    COUNT(*) as count
FROM clinics 
WHERE email IS NULL AND is_active = true

UNION ALL

SELECT 
    'Missing Both Phone and Email' as issue,
    COUNT(*) as count
FROM clinics 
WHERE phone IS NULL AND email IS NULL AND is_active = true;

-- 6. View phone number formats
SELECT 
    name,
    phone,
    CASE 
        WHEN phone ~ '^\(\d{3}\) \d{3}-\d{4}' THEN 'Standard Format'
        WHEN phone ~ 'x\d+' THEN 'Has Extension'
        WHEN phone IS NULL THEN 'Missing'
        ELSE 'Other Format'
    END as phone_format
FROM clinics 
WHERE is_active = true
ORDER BY phone_format, name
LIMIT 10;

-- 7. Recent activity
SELECT 
    name,
    region,
    created_at::date as date_added,
    updated_at::date as last_updated
FROM clinics 
ORDER BY created_at DESC 
LIMIT 10;

-- 8. Database size and stats
SELECT 
    schemaname,
    tablename,
    attname as column_name,
    n_distinct,
    most_common_vals
FROM pg_stats 
WHERE schemaname = 'public' AND tablename = 'clinics'
ORDER BY tablename, attname;

-- 9. Check all your tables and their row counts
SELECT 
    schemaname,
    tablename,
    n_tup_ins as "rows inserted",
    n_tup_upd as "rows updated",
    n_tup_del as "rows deleted"
FROM pg_stat_user_tables 
WHERE schemaname = 'public'
ORDER BY tablename; 