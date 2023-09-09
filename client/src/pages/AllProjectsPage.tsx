import { ProjectSheet } from "@/components/ProjectSheet";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/apis/project-api";

export default function AllProjectsPage() {
  const { status, error, data } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    onSuccess: (data) => console.log(data),
  });

  // todo need to add loading skeleton component
  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") {
    return <h1>{JSON.stringify(error)}</h1>;
  }

  return (
    <div className="lg:h-screen lg:overflow-y-scroll">
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="items-end justify-between space-y-2 lg:flex">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
            <p className="mt-2 text-muted-foreground">
              Here is s a list of your projects!
            </p>
          </div>
          <ProjectSheet />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:overflow-y-scroll">
          {data.data.projects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
