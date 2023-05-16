package hanseimeet.meet.dto.board.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserBoard {
    private int board_id;
    private String title;
    private String contents;
    private int hit_cnt;
    private String created_At;
    private String creator_id;
    private String updated_At;
    private String updater_id;
}
