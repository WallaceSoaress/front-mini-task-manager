import { useAuth } from "../../../hooks/auth";
import { Actions, HomeShell, Panel } from "./styles";

const Home = () => {
  const { signOut, user } = useAuth();

  return (
    <HomeShell>
      <Panel>
        <span>Area privada</span>
        <h1>Mini Task Manager</h1>
        <p>
          {user?.name} esta autenticado. As proximas telas privadas entram aqui.
        </p>

        <Actions>
          <button type="button" onClick={signOut}>
            Sair
          </button>
        </Actions>
      </Panel>
    </HomeShell>
  );
};

export default Home;
