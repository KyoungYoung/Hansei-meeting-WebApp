package hanseimeet.meet.dto.user.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateRequest {
    private String name;
    private Integer age;
    private String major;

    public UserCreateRequest(String name, Integer age, String major) {
        this.name = name;
        this.age = age;
        this.major = major;
    }
}
