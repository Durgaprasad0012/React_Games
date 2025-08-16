import { useEffect, useState } from "react";
import CommonWallet from "../component/common/CommonWallet"
import { Link, Route, Routes } from "react-router-dom";
import Parity from "../component/ui/game_platform/parityJS/Game";
import RPS from "../component/ui/game_platform/rpsJS/Game";
import TikTakToe from "../component/ui/game_platform/tiktagtoe/Game";
import Loading_page from "../component/ui/Loading_page";

const Home: React.FC = () => {
    const [wallet, setWallet] = useState<number>(1000);
    const [games, setGames] = useState<string>("");
    const [isClick, setIsClick] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const name = e.currentTarget.textContent;
        setIsClick(true);
        setGames(name);
    }

    // Simulate loading effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4000); // 1.5s loading animation
        return () => clearTimeout(timer);
    }, []);


    return (
        <div className="w-screen h-screen relative">
            {isLoading && <Loading_page />}
            <header className="w-full py-2 text-center font-normal text-md sm:text-lg sm:font-semibold md:text-xl md:font-bold lg:text-2xl lg:font-black shadow-2xl shadow-white/80 text-shadow-2xs text-shadow-amber-200">
                React Game
            </header>
            <CommonWallet setGames={setGames} setIsClick={setIsClick} game={games} wallet={wallet} />
            {/* <Game /> */}
            <div className="w-full overflow-auto p-2">
                {!isClick ?
                    <div>
                        <p className="text-center font-black text-lg">Games</p>
                        <div className="w-full flex flex-col justify-center items-center flex-wrap gap-3 pt-5">
                            <Link onClick={handleClick} to={"/parityJS"} className="p-2 w-full sm:w-150 shadow-2xs shadow-amber-50 text-center rounded bg-black/30 active:opacity-60 cursor-pointer ">
                                Parity JS
                            </Link>
                            <Link onClick={handleClick} to={"/rpsJS"} className="p-2 w-full sm:w-150 shadow-2xs shadow-amber-50 text-center rounded bg-black/30 active:opacity-60 cursor-pointer ">
                                Rock Paper Scissor
                            </Link>
                            <Link onClick={handleClick} to={"/tiktaktoeJs"} className="p-2 w-full sm:w-150 shadow-2xs shadow-amber-50 text-center rounded bg-black/30 active:opacity-60 cursor-pointer ">
                                Tic Tac Toe
                            </Link>
                        </div>
                    </div>
                    :
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/parityJS" element={<Parity setWallet={setWallet} wallet={wallet} />} />
                        <Route path="/rpsJS" element={<RPS setWallet={setWallet} wallet={wallet} />} />
                        <Route path="/tiktaktoeJs" element={<TikTakToe setWallet={setWallet} wallet={wallet} />} />
                    </Routes>
                }
            </div>
                <footer className="w-full absolute bottom-0 text-center py-4 text-gray-500 text-sm">
                    © {new Date().getFullYear()} Durgaprasad. All rights reserved.
                </footer>
        </div>
    )
}

export default Home