"use client";

import { useProfile } from "@/hooks/useProfile";
import { ProfileHeader } from "./ProfileHeader";
import { SkillsSection } from "./SkillsSection";
import { WorkExperienceSection } from "./WorkExperienceSection";
import { EducationSection } from "./EducationSection";
import { ChangePasswordSection } from "./ChangePasswordSection";

export function ProfileView() {
  const {
    user,
    loading,
    saving,
    handleEditProfile,
    handleEditPassword,
    handleAddWorkExperience,
    handleEditWorkExperience,
    handleDeleteWorkExperience,
    handleAddEducation,
    handleEditEducation,
    handleDeleteEducation,
  } = useProfile();

  if (loading) {
    return (
      <section className="border-t border-border py-24">
        <div className="px-6">
          <div className="py-16 text-center border border-border bg-muted/30">
            <p className="text-sm text-muted-foreground">Loading profile…</p>
          </div>
        </div>
      </section>
    );
  }

  if (!user) return null;

  return (
    <section className="border-t border-border">
      <div className="px-6 py-8">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] mb-1">
          Account
        </p>
        <h1 className="text-2xl font-medium tracking-tight">Profile</h1>
      </div>

      <div className="border-t border-border">
        <ProfileHeader user={user} saving={saving} onSave={handleEditProfile} />
        <SkillsSection
          skills={user.skills}
          saving={saving}
          onSave={(skills) => handleEditProfile({ skills })}
        />
        <WorkExperienceSection
          workExperience={user.workExperience ?? []}
          saving={saving}
          onAdd={handleAddWorkExperience}
          onEdit={handleEditWorkExperience}
          onDelete={handleDeleteWorkExperience}
        />
        <EducationSection
          education={user.education ?? []}
          saving={saving}
          onAdd={handleAddEducation}
          onEdit={handleEditEducation}
          onDelete={handleDeleteEducation}
        />
        <ChangePasswordSection saving={saving} onSave={handleEditPassword} />
      </div>
    </section>
  );
}
