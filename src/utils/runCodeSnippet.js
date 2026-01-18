import axios from "axios";

export const handleRunCode = async (code, codeLanguage) => {
    // const [output, setOutput] = useState('');
    console.log(codeLanguage);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/code/run`, {
        language: codeLanguage,
        code: code,
      });
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log("Error: " + err.message);
    }
}