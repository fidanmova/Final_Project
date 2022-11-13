import PageTemplate from "../components/ui/PageTemplate";
import CodeEditor from "../components/Editor";

const editor = () => {
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed-Editor">
      <CodeEditor />
    </PageTemplate>
  );
};

export default editor;
