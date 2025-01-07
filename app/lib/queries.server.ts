export async function getUserCourses(supabase: any, userId: string) {
    const { data, error } = await supabase.client
        .from('courses')
        .select('course_id, name, number')
        .eq('owner', userId);

    if (error) {
        console.error('Error fetching courses:', error);
        return [];
    }

    return data;
}

export default async function getUserById(supabase: any, userId: string) {
    const data = await supabase.client.from('accounts')
        .select('uid, email, is_teacher, first_name, last_name, profile_image').eq('uid', userId).single();
    return data;
}
