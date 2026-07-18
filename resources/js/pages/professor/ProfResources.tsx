import { Plus, Upload, Download } from "lucide-react";
import ProfessorLayout from "@/layouts/professor-layout";

export default function ProfResources() {
  const folders = [
    { name: "Lecture Slides", files: 24, size: "340 MB", icon: "📊", updated: "Nov 17" },
    { name: "Lab Manuals", files: 8, size: "120 MB", icon: "🔬", updated: "Nov 10" },
    { name: "Past Papers", files: 16, size: "85 MB", icon: "📝", updated: "Oct 28" },
    { name: "Reference Books", files: 6, size: "1.2 GB", icon: "📚", updated: "Sep 5" },
    { name: "Video Lectures", files: 12, size: "4.8 GB", icon: "🎬", updated: "Nov 14" },
    { name: "Assignments Archive", files: 30, size: "210 MB", icon: "🗂", updated: "Nov 18" },
  ];
  const recent = [
    { name: "DS_Week10_Graphs.pdf", size: "4.2 MB", date: "Nov 17", type: "pdf" },
    { name: "Lab5_HeapSort.zip", size: "1.1 MB", date: "Nov 14", type: "zip" },
    { name: "MidSem_Solution.pdf", size: "2.8 MB", date: "Nov 12", type: "pdf" },
    { name: "DS_Quiz3_Q.docx", size: "340 KB", date: "Nov 10", type: "doc" },
  ];

  const createFolder = () => {
    const name = window.prompt("Folder name");
    if (!name?.trim()) return;

    window.alert(`Created folder: ${name.trim()}`);
  };

  const uploadResource = () => {
    window.alert("Use the upload flow to attach course files.");
  };

  const viewAll = () => {
    window.alert(`There are ${recent.length} recent uploads in this folder.`);
  };

  const downloadFile = (name: string) => {
    window.alert(`Preparing download for ${name}.`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Resources & Notes</h1><p className="text-sm text-muted-foreground">Course materials and lecture content</p></div>
        <div className="flex items-center gap-2">
          <button onClick={createFolder} className="flex items-center gap-2 bg-secondary border border-border text-foreground px-4 py-2 rounded-lg text-sm hover:bg-card transition-colors"><Plus size={14} />New Folder</button>
          <button onClick={uploadResource} className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"><Upload size={14} />Upload</button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {folders.map(f => (
          <div key={f.name} className="bg-card border border-border rounded-2xl p-4 hover:border-indigo-500/30 hover:-translate-y-0.5 transition-all cursor-pointer group">
            <div className="text-2xl mb-3">{f.icon}</div>
            <p className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{f.name}</p>
            <p className="text-xs text-muted-foreground">{f.files} files · {f.size}</p>
            <p className="text-xs text-muted-foreground mt-1">Updated {f.updated}</p>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border"><p className="font-semibold text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Recently Uploaded</p><button onClick={viewAll} className="text-xs text-primary hover:underline">View all</button></div>
        {recent.map(f => {
          const ext = { pdf: "bg-red-500/10 text-red-400", zip: "bg-yellow-500/10 text-yellow-400", doc: "bg-blue-500/10 text-blue-400" }[f.type as "pdf" | "zip" | "doc"];
          return (
            <div key={f.name} className="flex items-center gap-3 px-4 py-3 border-b border-border/50 hover:bg-secondary/30 transition-colors">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ext}`}>{f.type.toUpperCase()}</span>
              <p className="text-sm flex-1 truncate">{f.name}</p>
              <p className="text-xs text-muted-foreground whitespace-nowrap">{f.size}</p>
              <p className="text-xs text-muted-foreground ml-4 whitespace-nowrap">{f.date}</p>
              <button onClick={() => downloadFile(f.name)} className="ml-2 text-muted-foreground hover:text-foreground"><Download size={14} /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


ProfResources.layout = (page: React.ReactNode) => <ProfessorLayout children={page} />;
