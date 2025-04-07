import { supabase, createAdminClient, handleSupabaseError } from './client';
import { Database } from '@/lib/database.types';

type Tables = Database['public']['Tables'];

// Type for faculty data
export type Faculty = Tables['faculty']['Row'];
export type FacultyInsert = Tables['faculty']['Insert'];
export type FacultyUpdate = Tables['faculty']['Update'];

// Type for paper data
export type Paper = Tables['papers']['Row'];
export type PaperInsert = Tables['papers']['Insert'];
export type PaperUpdate = Tables['papers']['Update'];

// Type for research area data
export type ResearchArea = Tables['research_areas']['Row'];
export type ResearchAreaInsert = Tables['research_areas']['Insert'];
export type ResearchAreaUpdate = Tables['research_areas']['Update'];

/**
 * Get all faculty members with optional filters
 */
export async function getFaculty(filters?: {
  name?: string;
  affiliation?: string;
  interests?: string[];
}) {
  try {
    let query = supabase
      .from('faculty')
      .select('*');

    if (filters?.name) {
      query = query.ilike('name', `%${filters.name}%`);
    }

    if (filters?.affiliation) {
      query = query.ilike('affiliation', `%${filters.affiliation}%`);
    }

    if (filters?.interests?.length) {
      query = query.contains('interests', filters.interests);
    }

    const { data, error } = await query.order('name');

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
}

/**
 * Get a single faculty member by ID
 */
export async function getFacultyById(id: string) {
  try {
    const { data, error } = await supabase
      .from('faculty')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
}

/**
 * Get all papers with optional filters
 */
export async function getPapers(filters?: {
  title?: string;
  year?: number;
  researchAreas?: string[];
}) {
  try {
    let query = supabase
      .from('papers')
      .select(`
        *,
        faculty_papers!inner (
          faculty:faculty_id (
            id,
            name
          )
        ),
        paper_research_areas!inner (
          research_area:research_area_id (
            id,
            name
          )
        )
      `);

    if (filters?.title) {
      query = query.ilike('title', `%${filters.title}%`);
    }

    if (filters?.year) {
      query = query.eq('year', filters.year);
    }

    if (filters?.researchAreas?.length) {
      query = query.contains('paper_research_areas.research_area.name', filters.researchAreas);
    }

    const { data, error } = await query.order('year', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
}

/**
 * Get a single paper by ID
 */
export async function getPaperById(id: string) {
  try {
    const { data, error } = await supabase
      .from('papers')
      .select(`
        *,
        faculty_papers!inner (
          faculty:faculty_id (
            id,
            name
          )
        ),
        paper_research_areas!inner (
          research_area:research_area_id (
            id,
            name
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
}

/**
 * Get all research areas
 */
export async function getResearchAreas() {
  try {
    const { data, error } = await supabase
      .from('research_areas')
      .select('*')
      .order('name');

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
}

/**
 * Create a new faculty member
 */
export async function createFaculty(faculty: FacultyInsert) {
  try {
    const { data, error } = await supabase
      .from('faculty')
      .insert(faculty)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
}

/**
 * Create a new paper
 */
export async function createPaper(paper: PaperInsert) {
  try {
    const { data, error } = await supabase
      .from('papers')
      .insert(paper)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
}

/**
 * Create a new research area
 */
export async function createResearchArea(researchArea: ResearchAreaInsert) {
  try {
    const { data, error } = await supabase
      .from('research_areas')
      .insert(researchArea)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleSupabaseError(error);
  }
}

/**
 * Link a paper to faculty members
 */
export async function linkPaperToFaculty(paperId: string, facultyIds: string[]) {
  try {
    const { error } = await supabase
      .from('faculty_papers')
      .insert(
        facultyIds.map(facultyId => ({
          paper_id: paperId,
          faculty_id: facultyId
        }))
      );

    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error);
  }
}

/**
 * Link a paper to research areas
 */
export async function linkPaperToResearchAreas(paperId: string, researchAreaIds: string[]) {
  try {
    const { error } = await supabase
      .from('paper_research_areas')
      .insert(
        researchAreaIds.map(researchAreaId => ({
          paper_id: paperId,
          research_area_id: researchAreaId
        }))
      );

    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error);
  }
} 