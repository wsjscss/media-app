import { observer } from "mobx-react-lite";
import "./App.css";
import { MediaList } from "./components/mediaList/MediaList";
import { MediaForm } from "./components/mediaForm/MediaForm";
import { FilterBar } from "./components/filterBar/FilterBar";

const App = observer(() => {
  return (
    <>
      <h1>Media App</h1>

      <MediaForm />
      <FilterBar />

      <hr />

      <MediaList />
    </>
  );
});

export default App;
