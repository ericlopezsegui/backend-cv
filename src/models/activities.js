const pool = require('../utils/db');

const getAllActivities = () => {
    return pool.query('SELECT * FROM Activities')
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const getActivitiesByActivityID = (id) => {
    return pool.query('SELECT * FROM Activities WHERE ActivityID = $1', [id])
        .then(activityResult => {
            const activity = activityResult.rows[0];

            if (!activity) {
                throw new Error('Activity not found');
            }

            return pool.query('SELECT FileName FROM ActivityFiles WHERE ActivityID = $1', [id])
                .then(filesResult => {
                    const files = filesResult.rows.map(file => ({
                        name: file.fileName,
                        url: `data:application/octet-stream;base64,${file.file}`
                    }))

                    activity.files = files;
                    return activity;
                });
        })
        .catch(err => {
            throw err;
        });
};
const getActivitiesBySubjectID = id => {
    return pool.query('SELECT * FROM Activities WHERE SubjectID = $1', [id])
        .then(res => res.rows)
        .catch(err => { throw err; });
};

const createActivity = async (SubjectID, Title, Description, Files, Deadline) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const res = await client.query(
            'INSERT INTO Activities (SubjectID, Title, Description, Deadline) VALUES ($1, $2, $3, $4) RETURNING *',
            [SubjectID, Title, Description, Deadline]
        );

        const activityID = res.rows[0].activityid;
        console.log(activityID);

        const filePromises = Files.map(file => {
            console.log(file);
            return client.query(
                'INSERT INTO ActivityFiles (ActivityID, File, FileName) VALUES ($1, $2, $3)',
                [activityID, file.base64, file.fileName]
            );
        });

        await Promise.all(filePromises);

        await client.query('COMMIT');

        return getActivitiesByActivityID(activityID);
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const updateActivity = async (activity, Files) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(
            'UPDATE Activities SET SubjectID = $1, Title = $2, Description = $3, Deadline = $4 WHERE ActivityID = $5',
            [activity.SubjectID, activity.Title, activity.Description, activity.Deadline, activity.ActivityID]
        );

        const filePromises = Files.map(file => {
            return client.query(
                'INSERT INTO ActivityFiles (ActivityID, File, FileName) VALUES ($1, $2, $3)',
                [activity.ActivityID, file.base64, file.fileName]
            );
        });

        await Promise.all(filePromises);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const deleteActivity = id => {
    return pool.query('DELETE FROM Activities WHERE ActivityID = $1', [id])
        .then(() => {})
        .catch(err => { throw err; });
};

module.exports = {
    getAllActivities,
    getActivitiesByActivityID,
    getActivitiesBySubjectID,
    createActivity,
    updateActivity,
    deleteActivity
};
