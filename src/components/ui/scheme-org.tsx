import { type Person, type WithContext } from "schema-dts";
import DataProvider, {
  type Award,
  type Education,
  type Experience,
  type PersonalInformation,
  type Skill,
} from "../../data_provider/data_provider";

function SchemeOrg({ userData }: { userData: DataProvider }) {
  const pi: PersonalInformation = userData.personalInformation;
  const fullName: string = pi.name;
  const experiences: Experience[] = userData.experiences;
  const educations: Education[] = userData.educations;
  const awards: Award[] = userData.awards;
  const technicalSkills: string[] = userData.technical_skills.flatMap((group) =>
    group.skills.map((s) => s.label)
  );
  const softSkills: string[] = userData.soft_skills.flatMap((group) =>
    group.skills.map((s) => s.label)
  );
  const allSkills: string[] = [...technicalSkills, ...softSkills];
  const allTags: string[] = userData.technical_skills
    .flatMap((group) => group.skills.map((s: Skill) => s.tags))
    .flat();

  const socialUrls = pi.social_links.map((link) => link.url);

  const jsonScheme: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    jobTitle: pi.title,
    description: pi.summary || pi.about_descriptions.join(" "),
    email: pi.email,
    telephone: pi.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: pi.location,
    },
    url: pi.website,
    image: pi.photo.default || pi.photo.light,
    sameAs: [...socialUrls, pi.blog_url].filter(Boolean),
    knowsAbout: [...allSkills, ...allTags],
    award: awards.map((a) => a.name),
    alumniOf: educations.map((edu) => ({
      "@type": "CollegeOrUniversity",
      "@id": edu.id,
      name: edu.institution.name,
      url: edu.institution.url,
    })),
    worksFor: experiences.map((exp) => ({
      "@type": "Organization",
      name: exp.institution.name,
      url: exp.institution.url,
      logo: exp.institution.logo,
    })),
    hasOccupation: experiences.map((exp) => ({
      "@type": "Occupation",
      name: exp.title,
      occupationLocation: exp.institution.location,
      responsibilities: exp.responsibilities.join(" "),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonScheme) }}
    />
  );
}

export default SchemeOrg;
