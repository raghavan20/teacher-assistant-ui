import React, { useState } from 'react';
import { Newspaper, BookOpen, HelpCircle, GraduationCap, X } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
}

const resources: Resource[] = [
  {
    id: 'news',
    title: 'Latest Teaching News',
    icon: Newspaper,
    description: 'Stay updated with the latest trends in education',
  },
  {
    id: 'resources',
    title: 'Teaching Resources',
    icon: BookOpen,
    description: 'Access curated teaching materials and lesson plans',
  },
  {
    id: 'quiz',
    title: 'Quiz Generator',
    icon: HelpCircle,
    description: 'Create engaging quizzes for your students',
  },
  {
    id: 'development',
    title: 'Professional Development',
    icon: GraduationCap,
    description: 'Explore opportunities for growth',
  },
];

interface ResourceDetailProps {
  resource: Resource;
  onClose: () => void;
}

function ResourceDetail({ resource, onClose }: ResourceDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">{resource.title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Content for {resource.title} will be loaded from the API.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">
              This is a placeholder for API-fetched content related to {resource.title.toLowerCase()}.
              The actual implementation will display dynamic content based on the current lesson context.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPanel() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  return (
    <>
      <div className="w-full max-w-md mx-auto p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Resources</h2>
        <div className="grid grid-cols-2 gap-4">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <button
                key={resource.id}
                onClick={() => setSelectedResource(resource)}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
              >
                <Icon className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="text-sm font-medium text-gray-800 mb-1">{resource.title}</h3>
                <p className="text-xs text-gray-600">{resource.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedResource && (
        <ResourceDetail
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}
    </>
  );
}