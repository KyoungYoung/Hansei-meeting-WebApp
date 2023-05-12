package hanseimeet.meet.dto.user.response;


import hanseimeet.meet.domain.user.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private long id;
    private String name;
    private String major;
    private Integer age;

    public UserResponse(long id, String name, String major, Integer age) {
        this.id = id;
        this.name = name;
        this.major = major;
        this.age = age;
    }

    public UserResponse(long id, User user) {
        this.id = id;
        this.name = user.getName();
        this.major = user.getMajor();
        this.age = user.getAge();
    }


}