import CodeEditor from "../components/editor";
import PageTemplate from "../components/ui/PageTemplate";

const codeEditor = () => {
  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed-Editor">
      <CodeEditor />
    </PageTemplate>
  );
};

export default codeEditor;
