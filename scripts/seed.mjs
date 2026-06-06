import pg from 'pg';

const { Pool } = pg;

const DATABASE_URL = process.env.DATABASE_URL;
const DB_HOST = process.env.DB_HOST || 'db.mxbnndlfrewjnzbsqthi.supabase.co';
const DB_PORT = process.env.DB_PORT || '5432';
const DB_NAME = process.env.DB_NAME || 'postgres';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Aravind@4149';

function getConnectionString() {
  if (DATABASE_URL) return DATABASE_URL;
  if (!DB_PASSWORD) {
    console.error(`
❌ Database password not found.

Set one of:
  DATABASE_URL    postgresql://postgres:PASSWORD@db.mxbnndlfrewjnzbsqthi.supabase.co:5432/postgres
  DB_PASSWORD     (your Supabase database password)

Get the password from: Supabase Dashboard → Project Settings → Database → Database password
`);
    process.exit(1);
  }
  return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

async function seed() {
  const pool = new Pool({ connectionString: getConnectionString() });

  try {
    console.log('⏳ Connecting to database...');
    await pool.query('SELECT 1');
    console.log('✅ Connected');

    // ──────────────────────────────────────────────
    // courses
    // ──────────────────────────────────────────────
    console.log('\n⏳ Creating courses table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        progress INTEGER NOT NULL DEFAULT 0,
        icon_name TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    await pool.query(`ALTER TABLE courses ENABLE ROW LEVEL SECURITY;`);
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='courses' AND policyname='anon_select_courses') THEN
          CREATE POLICY "anon_select_courses" ON courses FOR SELECT TO anon USING (true);
        END IF;
      END $$;
    `);
    await pool.query('DELETE FROM courses');
    const courseSeeds = [
      { title: 'Advanced React Patterns', progress: 72, icon_name: 'BookOpen' },
      { title: 'Next.js Mastery', progress: 45, icon_name: 'Globe' },
      { title: 'TypeScript Deep Dive', progress: 88, icon_name: 'Code' },
      { title: 'Framer Motion Workshop', progress: 30, icon_name: 'Zap' },
    ];
    for (const c of courseSeeds) {
      await pool.query('INSERT INTO courses (title, progress, icon_name) VALUES ($1,$2,$3)', [c.title, c.progress, c.icon_name]);
      console.log(`  ✅ Course: ${c.title}`);
    }

    // ──────────────────────────────────────────────
    // user_stats (single row — one user)
    // ──────────────────────────────────────────────
    console.log('\n⏳ Creating user_stats table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_stats (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        ahead_percent INTEGER NOT NULL DEFAULT 82,
        learning_hours INTEGER NOT NULL DEFAULT 386,
        completed_courses INTEGER NOT NULL DEFAULT 14,
        certificates INTEGER NOT NULL DEFAULT 8,
        streak_days INTEGER NOT NULL DEFAULT 17,
        streak_active_until INTEGER NOT NULL DEFAULT 4,
        total_compute_hours DECIMAL NOT NULL DEFAULT 142.8,
        efficiency_rate DECIMAL NOT NULL DEFAULT 12.4,
        active_modules INTEGER NOT NULL DEFAULT 8,
        avg_session_hours DECIMAL NOT NULL DEFAULT 2.4,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    await pool.query(`ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;`);
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='user_stats' AND policyname='anon_select_user_stats') THEN
          CREATE POLICY "anon_select_user_stats" ON user_stats FOR SELECT TO anon USING (true);
        END IF;
      END $$;
    `);
    await pool.query('DELETE FROM user_stats');
    await pool.query(`
      INSERT INTO user_stats (name, ahead_percent, learning_hours, completed_courses, certificates, streak_days, streak_active_until, total_compute_hours, efficiency_rate, active_modules, avg_session_hours)
      VALUES ('Aravind', 82, 386, 14, 8, 17, 4, 142.8, 12.4, 8, 2.4)
    `);
    console.log('  ✅ User stats: Aravind');

    // ──────────────────────────────────────────────
    // activities (weekly)
    // ──────────────────────────────────────────────
    console.log('\n⏳ Creating activities table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        day TEXT NOT NULL,
        hours INTEGER NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    await pool.query(`ALTER TABLE activities ENABLE ROW LEVEL SECURITY;`);
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='activities' AND policyname='anon_select_activities') THEN
          CREATE POLICY "anon_select_activities" ON activities FOR SELECT TO anon USING (true);
        END IF;
      END $$;
    `);
    await pool.query('DELETE FROM activities');
    const activitySeeds = [
      { day: 'Mon', hours: 2 },
      { day: 'Tue', hours: 3 },
      { day: 'Wed', hours: 4 },
      { day: 'Thu', hours: 2 },
      { day: 'Fri', hours: 5 },
      { day: 'Sat', hours: 6 },
      { day: 'Sun', hours: 3 },
    ];
    for (const a of activitySeeds) {
      await pool.query('INSERT INTO activities (day, hours) VALUES ($1, $2)', [a.day, a.hours]);
      console.log(`  ✅ Activity: ${a.day} (${a.hours}h)`);
    }

    // ──────────────────────────────────────────────
    // achievements
    // ──────────────────────────────────────────────
    console.log('\n⏳ Creating achievements table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS achievements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        icon TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    await pool.query(`ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;`);
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='achievements' AND policyname='anon_select_achievements') THEN
          CREATE POLICY "anon_select_achievements" ON achievements FOR SELECT TO anon USING (true);
        END IF;
      END $$;
    `);
    await pool.query('DELETE FROM achievements');
    const achievementSeeds = [
      { title: '7-Day Streak', icon: '\u{1F525}' },
      { title: 'Top 10% Learner', icon: '\u{1F3C6}' },
      { title: 'React Expert', icon: '\u{2B50}' },
    ];
    for (const a of achievementSeeds) {
      await pool.query('INSERT INTO achievements (title, icon) VALUES ($1, $2)', [a.title, a.icon]);
      console.log(`  ✅ Achievement: ${a.title}`);
    }

    // ──────────────────────────────────────────────
    // upcoming_classes
    // ──────────────────────────────────────────────
    console.log('\n⏳ Creating upcoming_classes table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS upcoming_classes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        time TEXT NOT NULL,
        duration TEXT NOT NULL,
        color TEXT NOT NULL DEFAULT 'from-white to-orange-500',
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    await pool.query(`ALTER TABLE upcoming_classes ENABLE ROW LEVEL SECURITY;`);
    await pool.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='upcoming_classes' AND policyname='anon_select_upcoming_classes') THEN
          CREATE POLICY "anon_select_upcoming_classes" ON upcoming_classes FOR SELECT TO anon USING (true);
        END IF;
      END $$;
    `);
    await pool.query('DELETE FROM upcoming_classes');
    const upcomingSeeds = [
      { title: 'Advanced React Patterns', time: '10:00 AM', duration: '1 Hour', color: 'from-white to-orange-500' },
      { title: 'System Design Fundamentals', time: '2:30 PM', duration: '45 Min', color: 'from-white to-orange-500' },
      { title: 'Framer Motion Workshop', time: '6:00 PM', duration: '90 Min', color: 'from-white to-orange-500' },
    ];
    for (const u of upcomingSeeds) {
      await pool.query('INSERT INTO upcoming_classes (title, time, duration, color) VALUES ($1, $2, $3, $4)', [u.title, u.time, u.duration, u.color]);
      console.log(`  ✅ Upcoming: ${u.title}`);
    }

    console.log('\n🎉 Seed complete! All 5 tables created and populated.');
  } catch (err) {
    console.error('\n❌ Seed failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
