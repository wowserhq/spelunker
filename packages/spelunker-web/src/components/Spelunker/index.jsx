import React from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';

import Account from '../entities/Account';
import AccountList from '../entities/Account/List';
import Area from '../entities/Area';
import AreaList from '../entities/Area/List';
import Character from '../entities/Character';
import CharacterList from '../entities/Character/List';
import Class from '../entities/Class';
import ClassList from '../entities/Class/List';
import Faction from '../entities/Faction';
import FactionList from '../entities/Faction/List';
import GameObject from '../entities/GameObject';
import GameObjectList from '../entities/GameObject/List';
import Item from '../entities/Item';
import ItemList from '../entities/Item/List';
import ItemSet from '../entities/ItemSet';
import ItemSetList from '../entities/ItemSet/List';
import Map from '../entities/Map';
import MapList from '../entities/Map/List';
import NPC from '../entities/NPC';
import NPCList from '../entities/NPC/List';
import Quest from '../entities/Quest';
import QuestList from '../entities/Quest/List';
import Race from '../entities/Race';
import RaceList from '../entities/Race/List';
import Search from '../Search';
import Side from '../entities/Side';
import Spell from '../entities/Spell';
import SpellList from '../entities/Spell/List';
import { ProjectLink } from '../core';

import client from './graphql-client';

import styles from './index.styl';
import './links.styl';

const Spelunker = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className={styles.spelunker}>
        <header className={styles.header}>
          <nav>
            <ul>
              <li><NavLink end to="/">Spelunker</NavLink></li>
              <li><NavLink to="/accounts">Accounts</NavLink></li>
              <li><NavLink to="/areas">Areas</NavLink></li>
              <li><NavLink to="/characters">Characters</NavLink></li>
              <li><NavLink to="/classes">Classes</NavLink></li>
              <li><NavLink to="/factions">Factions</NavLink></li>
              <li><NavLink to="/item-sets">Item Sets</NavLink></li>
              <li><NavLink to="/items">Items</NavLink></li>
              <li><NavLink to="/maps">Maps</NavLink></li>
              <li><NavLink to="/npcs">NPCs</NavLink></li>
              <li><NavLink to="/objects">Objects</NavLink></li>
              <li><NavLink to="/quests">Quests</NavLink></li>
              <li><NavLink to="/races">Races</NavLink></li>
              <li><NavLink to="/spells">Spells</NavLink></li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/accounts">
            <Route path=":id/*" element={<Account />} />
            <Route index element={<AccountList />} />
          </Route>

          <Route path="/areas">
            <Route path=":id/*" element={<Area />} />
            <Route index element={<AreaList />} />
          </Route>

          <Route path="/characters">
            <Route path=":id/*" element={<Character />} />
            <Route index element={<CharacterList />} />
          </Route>

          <Route path="/classes">
            <Route path=":id/*" element={<Class />} />
            <Route index element={<ClassList />} />
          </Route>

          <Route path="/factions">
            <Route path=":id/*" element={<Faction />} />
            <Route index element={<FactionList />} />
          </Route>

          <Route path="/items">
            <Route path=":id/*" element={<Item />} />
            <Route index element={<ItemList />} />
          </Route>

          <Route path="/item-sets">
            <Route path=":id/*" element={<ItemSet />} />
            <Route index element={<ItemSetList />} />
          </Route>

          <Route path="/maps">
            <Route path=":id/*" element={<Map />} />
            <Route index element={<MapList />} />
          </Route>

          <Route path="/npcs">
            <Route path=":id/*" element={<NPC />} />
            <Route index element={<NPCList />} />
          </Route>

          <Route path="/objects">
            <Route path=":id/*" element={<GameObject />} />
            <Route index element={<GameObjectList />} />
          </Route>

          <Route path="/quests">
            <Route path=":id/*" element={<Quest />} />
            <Route index element={<QuestList />} />
          </Route>

          <Route path="/races">
            <Route path=":id/*" element={<Race />} />
            <Route index element={<RaceList />} />
          </Route>

          <Route path="/sides">
            <Route path=":id/*" element={<Side />} />
          </Route>

          <Route path="/spells">
            <Route path=":id/*" element={<Spell />} />
            <Route index element={<SpellList />} />
          </Route>

          <Route path="/search">
            <Route path=":query/*" element={<Search />} />
          </Route>

          <Route path="/" end element={<Search />} />
        </Routes>

        <footer className={styles.footer}>
          <p>
            <ProjectLink /> · &copy;2018-2024 Wowser Contributors
          </p>

          <p>
            World of Warcraft &copy; Blizzard Entertainment, Inc. All rights reserved. Wrath of the
            Lich King is a trademark, and World of Warcraft and Warcraft are trademarks or
            registered trademarks of Blizzard Entertainment, Inc., in the U.S. and/or other
            countries.
          </p>
        </footer>
      </div>
    </Router>
  </ApolloProvider>
);

export default Spelunker;
