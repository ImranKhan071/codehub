import { useRef, useState } from "react";
import { Box, HStack, Button, Image } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, FILE_EXTENSIONS } from "../constants";
import Output from "./Output";

const CodeEditor = ({ roomId }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [nameId, setnameId] = useState(0);
  const [ext, setExt] = useState("js");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setExt(FILE_EXTENSIONS[language]);
    setValue(CODE_SNIPPETS[language]);
  };

  const downloadCode = () => {
    const fileName = prompt("Enter the file name", `file_${nameId}.${ext}`);
    setnameId(() => nameId + 1);
    if (fileName) {
      const code = editorRef.current.getValue();
      const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    }
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <LanguageSelector language={language} onSelect={onSelect} />
            <Button
              onClick={downloadCode}
              variant="outline"
              colorScheme="green"
              mr={4}
              mt={7}
              style={{
                display: "flex",
                alignContent: "center",
                marginLeft: "54px",
              }}
            >
              Download Code
            </Button>
          </Box>
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="calc(75vh - 100px)"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;

// import { useRef, useState } from "react";
// import { Box, HStack, Button } from "@chakra-ui/react";
// import { Editor } from "@monaco-editor/react";
// import LanguageSelector from "./LanguageSelector";
// import { CODE_SNIPPETS, FILE_EXTENSIONS } from "../constants";
// import Output from "./Output";
// import logo from "../../public/logo.png"; // Import the logo image

// const CodeEditor = ({ roomId }) => {
//   const editorRef = useRef();
//   const [value, setValue] = useState("");
//   const [language, setLanguage] = useState("javascript");
//   const [nameId, setnameId] = useState(0);
//   const [ext, setExt] = useState("js");

//   const onMount = (editor) => {
//     editorRef.current = editor;
//     editor.focus();
//   };

//   const onSelect = (language) => {
//     setLanguage(language);
//     setExt(FILE_EXTENSIONS[language]);
//     setValue(CODE_SNIPPETS[language]);
//   };

//   const downloadCode = () => {
//     const fileName = prompt("Enter the file name", `file_${nameId}.${ext}`);
//     setnameId(() => nameId + 1);
//     if (fileName) {
//       const code = editorRef.current.getValue();
//       const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = fileName;
//       link.click();
//     }
//   };

//   return (
//     <Box>
//       <Box
//         display="flex"
//         justifyContent="center"
//         m={-18} // Add margin top for spacing
//       >
//         <img src={logo} alt="Logo" height="200px" width="200px" />
//       </Box>
//       <HStack spacing={4}>
//         <Box w="50%">
//           <Box
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginBottom: "20px", // Add margin bottom for spacing
//             }}
//           >
//             <LanguageSelector language={language} onSelect={onSelect} />
//             <Button
//               onClick={downloadCode}
//               variant="outline"
//               colorScheme="green"
//               mt={7}
//             >
//               Download Code
//             </Button>
//           </Box>
//           <Editor
//             options={{
//               minimap: {
//                 enabled: false,
//               },
//             }}
//             height="calc(75vh - 100px)" // Subtract the height of the button and margin bottom
//             theme="vs-dark"
//             language={language}
//             defaultValue={CODE_SNIPPETS[language]}
//             onMount={onMount}
//             value={value}
//             onChange={(value) => setValue(value)}
//           />
//         </Box>
//         <Output editorRef={editorRef} language={language} />
//       </HStack>
//     </Box>
//   );
// };

// export default CodeEditor;
