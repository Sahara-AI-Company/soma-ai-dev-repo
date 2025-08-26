import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// User Publications Slice Types
interface UserPublicationsState {
  publications: Publication[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  // Publication preferences/filters using choice types
  preferredLanguage: "English" | "French" | "Spanish" | "German" | "Italian";
  defaultProfileType: "None" | "INDIVIDUAL" | "ORGANIZATION";
  defaultBankType: "None" | "Bank" | "Paypal";
  defaultCountry: "None" | "United States" | "Canada" | "United Kingdom" | "Australia";
  defaultCurrency: "None" | "USD" | "EUR" | "GBP" | "AUD";
}

// Publication interface
export interface Publication {
  // Primary key (Django uses publication_id as primary key)
  publication_id: number;
  
  // Publication Owner Details - Fixed data types
  publication_owner_id: number;
  publication_owner_username?: string | null;
  publication_owner_email?: string | null;
  publication_owner_full_name?: string | null;
  publication_owner_profile_picture?: string | null;
  publication_owner_bio?: string | null;
  publication_owner_date_of_birth?: string | null; // ISO date string

  // Publication Basic Details
  publication_username?: string | null;
  publication_name?: string | null;
  publication_description?: string | null;
  publication_logo?: string | null;
  publication_domain_name?: string | null;
  publication_domain_url?: string | null;
  publication_banner?: string | null;
  publication_csv_file?: string | null;
  publication_categories?: string[];
  publication_subcategories?: string[];
  publication_created_at?: string | null; // ISO datetime string
  publication_updated_at?: string | null; // ISO datetime string
  publication_language?: "English" | "French" | "Spanish" | "German" | "Italian";

  // Publication Payments Details - Fixed data types
  publication_client_user_id?: string | null;
  program_token?: string | null;
  publication_profile_type?: "None" | "INDIVIDUAL" | "ORGANIZATION";
  publication_owner_first_name?: string | null;
  publication_owner_last_name?: string | null;
  publication_address_line1?: string | null;
  publication_city?: string | null;
  publication_state_province?: string | null;
  publication_country?: string | null;
  publication_postal_code?: string | null;
  publication_bank_type?: "None" | "Bank" | "Paypal";
  publication_method_country?: "None" | "United States" | "Canada" | "United Kingdom" | "Australia";
  publication_method_currency?: "None" | "USD" | "EUR" | "GBP" | "AUD";
  publication_bank_name?: string | null;
  publication_bank_account_number?: string | null;
  publication_bank_branch_Id?: string | null;
  publication_bank_account_type?: string | null;
  publication_bank_account_owner_name?: string | null;
  publication_pledge_permissions?: boolean;
  publication_monthly_pledge?: number | null; // Changed from string to number
  publication_annual_pledge?: number | null;   // Changed from string to number
  publication_founding_pledge?: number | null; // Changed from string to number

  // Publication Website Details
  publication_about_page?: any[];
  publication_archives_page?: any[];

  // Publication Welcome Page Details
  publication_welcome_page_image?: string | null;
  publication_custom_skip_button?: string | null;

  // Emails Details
  publication_email_sender_name?: string | null;
  publication_header_and_footer?: any[];
  publication_welcome_email_message?: any | null;
  publication_welcome_number_message?: any | null;
  publication_import_email_message?: any[];

  // Community Details
  publication_comments_enabled?: boolean;

  // Chat Details
  publication_enable_subscriber_chat?: boolean;

  // Sections Details
  publication_extra_newsletter_suggestions?: any[];

  // Team Details
  publication_team?: any[];

  // Privacy Details
  publication_privacy_mode?: boolean;
  publication_terms_of_service?: any[];
  publication_privacy_policy?: any[];

  // Notification Settings - Added missing field
  notifications_enabled?: boolean;
}


// User Publications Slice Initial Values
const initialState: UserPublicationsState = {
  publications: [],
  loading: false,
  error: null,
  lastFetched: null,
  // Default values for choice types
  preferredLanguage: "English",
  defaultProfileType: "None",
  defaultBankType: "None",
  defaultCountry: "None",
  defaultCurrency: "None",
};

// User Publications Slice Functions
const userPublicationsSlice = createSlice({
  name: 'userPublications',
  initialState,
  reducers: {
    setPublications: (state, action: PayloadAction<Publication[]>) => {
      state.publications = action.payload;
      state.loading = false;
      state.error = null;
      state.lastFetched = Date.now();
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearPublications: (state) => {
      state.publications = [];
      state.loading = false;
      state.error = null;
      state.lastFetched = null;
    },
    addPublication: (state, action: PayloadAction<Publication>) => {
      state.publications.push(action.payload);
    },
    updatePublication: (state, action: PayloadAction<{ publication_id: number; updates: Partial<Publication> }>) => {
      const { publication_id, updates } = action.payload;
      const index = state.publications.findIndex(pub => pub.publication_id === publication_id);
      if (index !== -1) {
        state.publications[index] = { ...state.publications[index], ...updates };
      }
    },
    removePublication: (state, action: PayloadAction<number>) => {
      state.publications = state.publications.filter(pub => pub.publication_id !== action.payload);
    },
    setPreferredLanguage: (state, action: PayloadAction<"English" | "French" | "Spanish" | "German" | "Italian">) => {
      state.preferredLanguage = action.payload;
    },
    setDefaultProfileType: (state, action: PayloadAction<"None" | "INDIVIDUAL" | "ORGANIZATION">) => {
      state.defaultProfileType = action.payload;
    },
    setDefaultBankType: (state, action: PayloadAction<"None" | "Bank" | "Paypal">) => {
      state.defaultBankType = action.payload;
    },
    setDefaultCountry: (state, action: PayloadAction<"None" | "United States" | "Canada" | "United Kingdom" | "Australia">) => {
      state.defaultCountry = action.payload;
    },
    setDefaultCurrency: (state, action: PayloadAction<"None" | "USD" | "EUR" | "GBP" | "AUD">) => {
      state.defaultCurrency = action.payload;
    },
  },
});

// Exporting Functions
export const { 
  setPublications, 
  setLoading, 
  setError, 
  clearPublications, 
  addPublication, 
  updatePublication, 
  removePublication,
  setPreferredLanguage,
  setDefaultProfileType,
  setDefaultBankType,
  setDefaultCountry,
  setDefaultCurrency
} = userPublicationsSlice.actions;

export default userPublicationsSlice.reducer;