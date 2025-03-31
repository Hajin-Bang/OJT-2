import EmptyBox from "../../common/EmptyBox";
import SectionTitle from "../../common/SectionTitle";

/** matching interaction 화면 */
export default function MatchInteractionPanel() {
  return (
    <div className="space-y-2">
      <div>
        <SectionTitle title="Targets 1" />
        <EmptyBox text="No targets data available" height="h-[140px]" />
      </div>

      <div>
        <SectionTitle title="Targets 2" />
        <EmptyBox text="No targets data available" height="h-[140px]" />
      </div>

      <div>
        <SectionTitle title="Match" />
        <EmptyBox text="No match data available" />
      </div>
    </div>
  );
}
