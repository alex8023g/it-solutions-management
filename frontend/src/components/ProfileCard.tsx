import { useQuery } from '@apollo/client/react';
import { graphql } from '../gql';

const ProfileCardQuery = graphql(`
  query ProfileCard {
    profile {
      fullName
      headline
      bio
      location
      email
      photoUrl
      availableForWork
      skills {
        id
        name
        category
      }
      projects {
        id
        title
        description
        url
        repoUrl
        stack
        year
      }
      links {
        id
        kind
        label
        url
      }
    }
  }
`);

export function ProfileCard() {
  const { data, loading, error } = useQuery(ProfileCardQuery);

  if (loading) return <p className='card-status'>Loading profile…</p>;
  if (error)
    return <p className='card-status'>Could not load profile: {error.message}</p>;
  if (!data?.profile)
    return <p className='card-status'>No profile yet — run the seed.</p>;

  const { profile } = data;

  return (
    <article className='profile-card'>
      <header>
        {profile.photoUrl && (
          <img className='avatar' src={profile.photoUrl} alt='' width='96' height='96' />
        )}
        <h1 className='pb-2'>{profile.fullName}</h1>
        <p className='headline'>{profile.headline}</p>
        <p className='meta'>
          {profile.location}
          {profile.availableForWork && <span className='badge'>Available for work</span>}
        </p>
      </header>

      {profile.bio && <p className='bio'>{profile.bio}</p>}

      {profile.skills.length > 0 && (
        <section>
          <h2>Skills</h2>
          <ul className='skills'>
            {profile.skills.map((skill) => (
              <li key={skill.id}>
                {skill.name}
                {skill.category && <span className='category'>{skill.category}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {profile.projects.length > 0 && (
        <section>
          <h2>Projects</h2>
          <ul className='projects'>
            {profile.projects.map((project) => (
              <li key={project.id}>
                <h3>
                  {project.title}
                  {project.year && <span className='year'> · {project.year}</span>}
                </h3>
                {project.description && <p>{project.description}</p>}
                <p className='stack'>{project.stack.join(' · ')}</p>
                <p className='project-links'>
                  {project.url && <a href={project.url}>Live</a>}
                  {project.repoUrl && <a href={project.repoUrl}>Source</a>}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {profile.links.length > 0 && (
        <section>
          <h2>Contact</h2>
          <ul className='contact'>
            {profile.links.map((link) => (
              <li key={link.id}>
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
